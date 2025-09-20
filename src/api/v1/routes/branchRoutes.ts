import express from "express";
import { createBranch, getAllBranches, } from "../controllers/branchController";

const router = express.Router();

/**
 * Branch routes
 * POST /api/v1/branches - Create a new branch
 */
router.post("/", createBranch);
router.get("/", getAllBranches);

export default router;