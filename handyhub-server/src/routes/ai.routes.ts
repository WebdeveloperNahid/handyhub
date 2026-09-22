import { Router } from "express";
import { getRecommendationController } from "../controllers/ai.controller";

const router = Router();

// Endpoint: POST /api/v1/ai/recommend and POST /api/v1/ai
router.post("/recommend", getRecommendationController);
router.post("/", getRecommendationController);

export default router;