import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToMongoDB, getDb, serviceCollection } from "../config/db";

// Candidate models in order of priority
const CANDIDATE_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
];

const STOP_WORDS = new Set([
  "i", "need", "a", "an", "the", "my", "is", "are", "was", "were", "to", "for",
  "in", "on", "at", "and", "or", "of", "with", "broken", "repair", "fix", "help",
  "want", "looking", "problem", "issue", "please", "me", "some", "our", "house",
  "home", "needs", "does", "not", "work", "working", "দরকার", "চাই", "প্রয়োজন",
  "নষ্ট", "সমস্যা", "হচ্ছে", "না", "আমার", "একটি"
]);

// Bengali-to-English keyword hints for home services
const BENGALI_KEYWORD_MAP: Record<string, string[]> = {
  ফ্যান: ["fan"],
  এসি: ["ac"],
  পাইপ: ["pipe", "plumb"],
  প্লাম্বার: ["plumb", "pipe"],
  পানি: ["leak", "pipe", "plumb"],
  কল: ["tap", "pipe", "plumb"],
  সুইচ: ["switch", "electric"],
  কারেন্ট: ["electric", "wiring"],
  বিদ্যুৎ: ["electric", "wiring"],
  লাইট: ["switch", "electric"],
  রং: ["paint"],
  পেইন্ট: ["paint"],
  পরিষ্কার: ["clean", "sanitiz"],
  ক্লিন: ["clean"],
  তালা: ["lock", "door"],
  দরজা: ["door", "lock"],
  জানালা: ["window"],
  ফার্নিচার: ["furniture"],
  ফ্রিজ: ["refrigerator"],
  ওয়াশিং: ["washing"],
  কম্পিউটার: ["computer"],
};

/**
 * Escapes special regex characters.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Extracts searchable keyword patterns and stems from the user's issue text.
 */
function extractKeywordPatterns(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  const patterns = new Set<string>();

  for (const word of words) {
    // Check Bengali map
    for (const [bnWord, enKeywords] of Object.entries(BENGALI_KEYWORD_MAP)) {
      if (word.includes(bnWord)) {
        for (const k of enKeywords) {
          patterns.add(`\\b${escapeRegex(k)}`);
        }
      }
    }

    // English word-boundary pattern
    patterns.add(`\\b${escapeRegex(word)}\\b`);

    // Handle morphological stems (e.g. plumber -> plumb, cleaning -> clean, painter -> paint)
    if (word.endsWith("er") && word.length > 4) {
      patterns.add(`\\b${escapeRegex(word.slice(0, -2))}`);
    } else if (word.endsWith("ing") && word.length > 5) {
      patterns.add(`\\b${escapeRegex(word.slice(0, -3))}`);
    }
  }

  return Array.from(patterns);
}

/**
 * Queries MongoDB to search and retrieve relevant service data matching the user's issue.
 */
export const searchServicesFromDB = async (userProblem: string, db?: any) => {
  // Ensure database is connected
  let collection = serviceCollection;
  if (!collection) {
    if (db && typeof db.collection === "function") {
      collection = db.collection("services");
    } else {
      await connectToMongoDB();
      collection = serviceCollection || getDb().collection("services");
    }
  }

  const keywordPatterns = extractKeywordPatterns(userProblem);
  let matchedServices: any[] = [];

  if (keywordPatterns.length > 0) {
    const regexList = keywordPatterns.map((p) => ({ $regex: p, $options: "i" }));
    matchedServices = await collection
      .find({
        $or: [
          ...regexList.map((r) => ({ title: r })),
          ...regexList.map((r) => ({ category: r })),
          ...regexList.map((r) => ({ description: r })),
          ...regexList.map((r) => ({ highlights: r })),
        ],
      })
      .toArray();
  }

  // Retrieve all available platform services
  const allServices = await collection.find({}).toArray();

  if (allServices.length === 0) {
    throw new Error("No services are currently available in the database.");
  }

  // Combine results: direct keyword matches first, then remaining services without duplicates
  const seenIds = new Set<string>();
  const combinedServices: any[] = [];

  for (const s of matchedServices) {
    seenIds.add(s._id.toString());
    combinedServices.push(s);
  }

  for (const s of allServices) {
    if (!seenIds.has(s._id.toString())) {
      seenIds.add(s._id.toString());
      combinedServices.push(s);
    }
  }

  return combinedServices;
};

/**
 * Calls Gemini API with fallback models.
 */
async function callGeminiWithFallback(
  genAI: GoogleGenerativeAI,
  prompt: string
): Promise<string> {
  let lastError: any = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      if (responseText) {
        return responseText;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[AI Service] Model ${modelName} warning:`, err?.status || err?.message);
    }
  }

  throw lastError || new Error("Failed to get response from Gemini API.");
}

export interface AiRecommendationResult {
  serviceId: string;
  recommendedServiceTitle: string;
  category: string;
  reason: string;
  estimatedPrice: number | string;
}

/**
 * Core AI recommendation service:
 * Takes the user problem and either a list of database services or db instance,
 * queries relevant services, and uses Gemini to find the optimal recommendation.
 */
export const getAiRecommendationService = async (
  userProblem: string,
  servicesOrDb?: any
): Promise<AiRecommendationResult> => {
  try {
    // 1. Resolve services from database
    let candidateServices: any[] = [];

    if (Array.isArray(servicesOrDb) && servicesOrDb.length > 0) {
      candidateServices = servicesOrDb;
    } else {
      candidateServices = await searchServicesFromDB(userProblem, servicesOrDb);
    }

    if (!candidateServices || candidateServices.length === 0) {
      throw new Error("No services are currently available in the database.");
    }

    // Format service data for prompt efficiency
    const formattedServices = candidateServices.map((s: any) => ({
      id: s._id ? s._id.toString() : s.id,
      title: s.title || s.name,
      category: s.category || "General",
      price: s.price ?? 0,
      description: s.description || "",
      highlights: s.highlights || [],
    }));

    // 2. Initialize Gemini API Client
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.Gemini_API_Key ||
      process.env.GEMINI_KEY ||
      "";

    if (!apiKey) {
      console.warn("[AI Service] GEMINI_API_KEY not found in environment.");
      // Fallback matching directly from database search if no API key is available
      const bestMatch = candidateServices[0];
      return {
        serviceId: bestMatch._id ? bestMatch._id.toString() : bestMatch.id,
        recommendedServiceTitle: bestMatch.title || bestMatch.name,
        category: bestMatch.category || "General",
        reason: `Based on your problem description, '${bestMatch.title}' is the most suitable service available on HandyHub.`,
        estimatedPrice: bestMatch.price,
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `
You are an expert service recommendation AI assistant for HandyHub, an on-demand home service platform.

User's Problem Description: "${userProblem}"

Available Services in MongoDB Database:
${JSON.stringify(formattedServices, null, 2)}

Task:
1. Analyze the user's issue carefully (understand English, Bengali, or Banglish input).
2. Match it with the SINGLE MOST RELEVANT service available in the MongoDB database list above.
3. Provide a clear, polite, and helpful explanation in English explaining why this specific service is the best solution for their problem.

CRITICAL INSTRUCTIONS:
- You MUST choose an exact service that exists in the provided MongoDB database list.
- Return strictly a valid JSON object matching the schema below.
- Do NOT wrap with markdown syntax or backticks.
- The "reason" field MUST be written in English only. Do not use Bengali or any other language.

Output JSON Schema:
{
  "serviceId": "the exact 'id' string of the matched service from the database",
  "recommendedServiceTitle": "exact title of the service from the database",
  "category": "exact category of the service from the database",
  "reason": "A clear 2-3 sentence English explanation of why this service best matches the user problem.",
  "estimatedPrice": price_number_from_database
}
`;

    // 3. Generate content with fallback & retries
    let parsedData: any = null;
    try {
      const responseText = await callGeminiWithFallback(genAI, prompt);
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleanJson);
    } catch (aiError) {
      console.warn("[AI Service] Gemini call temporarily busy, using direct database match:", (aiError as any)?.message);
      // Fallback to top database matched service if AI service is temporarily unavailable
      const topMatch = candidateServices[0];
      return {
        serviceId: topMatch._id ? topMatch._id.toString() : topMatch.id,
        recommendedServiceTitle: topMatch.title || topMatch.name,
        category: topMatch.category || "General",
        reason: `Based on your problem description, '${topMatch.title}' is the most suitable service available on HandyHub.`,
        estimatedPrice: topMatch.price,
      };
    }

    // 4. Verify and link with exact database record
    const matchedRecord = candidateServices.find(
      (s: any) =>
        (s._id && s._id.toString() === parsedData.serviceId) ||
        (s.title && s.title.toLowerCase() === (parsedData.recommendedServiceTitle || "").toLowerCase())
    ) || candidateServices[0];

    return {
      serviceId: matchedRecord._id ? matchedRecord._id.toString() : (parsedData.serviceId || matchedRecord.id),
      recommendedServiceTitle: matchedRecord.title || parsedData.recommendedServiceTitle,
      category: matchedRecord.category || parsedData.category || "General",
      reason: parsedData.reason || "This service is the best match for your problem.",
      estimatedPrice: matchedRecord.price ?? parsedData.estimatedPrice,
    };
  } catch (error: any) {
    console.error("AI Service Error:", error);
    throw new Error(error.message || "Failed to process the AI recommendation.");
  }
};
