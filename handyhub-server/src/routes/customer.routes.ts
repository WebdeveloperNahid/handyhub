import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

const router = Router();

// Public routes
router.get("/services", CustomerController.getServices);
router.get("/services/:id", CustomerController.getServiceById);


export default router;
