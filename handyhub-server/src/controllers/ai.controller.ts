import { Request, Response } from "express";
import {
  getAiRecommendationService,
  searchServicesFromDB,
} from "../services/ai.service";
import { getDb } from "../config/db";

/**
 * Controller for AI Service Recommendation.
 * 1. Receives user issue/request.
 * 2. Queries the Database to search and retrieve relevant service data matching the issue.
 * 3. Sends retrieved service data to AI to process and return a helpful recommendation.
 */
export const getRecommendationController = async (
  req: Request,
  res: Response
) => {
  try {
    const rawProblem =
      req.body?.userProblem ||
      req.body?.problem ||
      req.body?.issue ||
      req.body?.prompt;

    if (!rawProblem || typeof rawProblem !== "string" || !rawProblem.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please describe your problem before submitting.",
      });
    }

    const userProblem = rawProblem.trim();

    // Resolve MongoDB connection
    let db = (req as any).db;
    if (!db) {
      try {
        db = getDb();
      } catch {
        db = undefined;
      }
    }

    // Step 1: Controller queries the database for relevant services matching the user's issue
    const relevantServices = await searchServicesFromDB(userProblem, db);

    // Step 2: AI processes the retrieved database services to generate recommendation
    const recommendation = await getAiRecommendationService(
      userProblem,
      relevantServices
    );

    return res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error: any) {
    console.error("[getRecommendationController] Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate recommendation",
    });
  }
};
