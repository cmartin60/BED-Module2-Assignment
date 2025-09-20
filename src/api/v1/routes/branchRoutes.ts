import express from "express";
import { createBranch, getAllBranches, getBranchById, } from "../controllers/branchController";

const router = express.Router();

/**
 * Branch routes
 * POST /api/v1/branches - Create a new branch
 */
router.post("/", createBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchById);

export default router;