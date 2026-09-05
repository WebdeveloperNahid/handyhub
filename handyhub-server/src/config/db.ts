import { Collection, Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const uri = process.env.MONGO_DB_URI as string;
if (!uri) {
  console.warn("Warning: MONGO_DB_URI is not set in environment variables.");
}

export const client = new MongoClient(uri || "mongodb://localhost:27017");

let database: Db;
let isConnected = false;
let connectionPromise: Promise<void> | null = null;

export let userCollection: Collection;
export let sessionCollection: Collection;
export let serviceCollection: Collection;
export let bookingCollection: Collection;

export async function connectToMongoDB(): Promise<void> {
  if (isConnected) return;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    try {
      await client.connect();
      database = client.db("handyhub");

      userCollection = database.collection("user");
      sessionCollection = database.collection("session");
      serviceCollection = database.collection("services");
      bookingCollection = database.collection("bookings");

      isConnected = true;
      console.log("You successfully connected to MongoDB!");
    } catch (err) {
      console.error("MongoDB Connection Error:", err);
      connectionPromise = null;
      throw err;
    }
  })();

  return connectionPromise;
}

export function getDb(): Db {
  if (!database) {
    throw new Error("Database not initialized. Call connectToMongoDB first.");
  }
  return database;
}

export async function dbMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    await connectToMongoDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
}
