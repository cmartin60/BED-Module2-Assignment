import express, { Router } from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

const router: Router = express.Router();

router.post("/", createBranch);
router.get("/", getAllBranches);
router.get("/:id", getBranchById);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;
