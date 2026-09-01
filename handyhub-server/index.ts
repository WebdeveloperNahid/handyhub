import express, { NextFunction, Request, Response } from "express";
import { Collection, MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
console.log("Starting server...");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_DB_URI as string;
const client = new MongoClient(uri);

// ---- Collections (পরে যখন যেটা বানাবেন, তখন uncomment করে নাম বসাবেন) ----
// let serviceCollection!: Collection;
// let bookingCollection!: Collection;
let userCollection!: Collection;
let sessionCollection!: Collection;

let isConnected = false;
let connectionPromise: Promise<void> | null = null;

async function connectToMongoDB() {
  if (isConnected) return;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    try {
      await client.connect();
      const database = client.db("handyhub");

      // ---- এখানে collection assign করবেন (uncomment + rename করবেন প্রয়োজনমতো) ----
      // serviceCollection = database.collection("services");
      // bookingCollection = database.collection("bookings");
      userCollection = database.collection("user");
      sessionCollection = database.collection("session");

      isConnected = true;
      console.log("You successfully connected to MongoDB!");
    } catch (err) {
      console.dir(err);
      connectionPromise = null;
      throw err;
    }
  })();

  return connectionPromise;
}

// প্রতিটা রিকোয়েস্টের আগে DB কানেকশন নিশ্চিত করা হচ্ছে
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectToMongoDB();
    next();
  } catch (err) {
    res.status(500).send({ error: "Database connection failed" });
  }
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("HandyHub Server is running!");
});

// ---- Auth Middleware  ----
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, unknown>;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(404).send({ message: "unauthorized access" });
  }
  const query = { token: token };
  const session = await sessionCollection.findOne(query);

  if (!session) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const userId = session.userId;
  const userQuery = { _id: userId };
  const user = await userCollection.findOne(userQuery);

  if (!user) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  req.user = user;
  next();
};

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "user") {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};
// ---- Auth Middleware শেষ ----

//----------------------------------
// ---- এখান থেকে নিচে collection-ভিত্তিক route গুলো যোগ হবে ----
// যখন কোনো collection বানাবেন (যেমন services), উপরে declare + assign করে
// এখানে তার POST/GET/PATCH/DELETE route গুলো একইভাবে বসাবেন
// যেমন tripnest-এ addTourCollection দিয়ে করা হয়েছিল
//----------------------------------

//-----------------------------------
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export default app;