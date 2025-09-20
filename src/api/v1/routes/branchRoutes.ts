import express from "express";
import { createBranch } from "../controllers/branchController";

const router = express.Router();

/**
 * Branch routes
 * POST /api/v1/branches - Create a new branch
 */
router.post("/", createBranch);

export default router;