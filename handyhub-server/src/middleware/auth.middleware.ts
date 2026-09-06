import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { sessionCollection, userCollection } from "../config/db";
import { IUser } from "../types";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    const session = await sessionCollection.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    const userId = typeof session.userId === "string" ? new ObjectId(session.userId) : session.userId;
    const user = await userCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ message: "unauthorized access" });
    }

    req.user = user as IUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized access", error });
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "user" && req.user?.role !== "customer") {
    return res.status(403).json({ message: "forbidden access" });
  }
  next();
};

export const verifyCustomer = verifyUser;

export const verifyProvider = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "provider") {
    return res.status(403).json({ message: "forbidden access" });
  }
  next();
};

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "forbidden access" });
  }
  next();
};
