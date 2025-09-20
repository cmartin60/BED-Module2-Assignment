import express from "express";
import { createBranch, getAllBranches, getBranchById, updateBranch,} from "../controllers/branchController";

const router = express.Router();

/**
 * Branch routes
 * POST /api/v1/branches - Create a new branch
 */
router.post("/", createBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchById);
router.put("/:id", updateBranch);

export default router;