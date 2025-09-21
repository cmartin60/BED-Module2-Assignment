import express from "express";
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch,} from "../controllers/branchController";

const router = express.Router();

/**
 * @route POST /api/v1/branches
 * @description Create a new branch.
 */
router.post("/", createBranch);

/**
 * @route GET /api/v1/branches
 * @description Retrieve a list of all branches.
 */
router.get("/", getAllBranches);

/**
 * @route GET /api/v1/branches/:id
 * @description Retrieve a single branch by its unique ID.
 * @param {string} id - The unique identifier of the branch.
 */
router.get("/:id", getBranchById);

/**
 * @route PUT /api/v1/branches/:id
 * @description Update an existing branch by its unique ID.
 * @param {string} id - The unique identifier of the branch.
 */
router.put("/:id", updateBranch);

/**
 * @route DELETE /api/v1/branches/:id
 * @description Delete a branch by its unique ID.
 * @param {string} id - The unique identifier of the branch.
 */
router.delete("/:id", deleteBranch);

export default router;