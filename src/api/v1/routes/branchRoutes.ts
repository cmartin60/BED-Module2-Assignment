import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/schemas";

const router: Router = express.Router();

router.post(
  "/",
  validateRequest(branchSchemas.create),
  branchController.createBranch
);
router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
router.put(
  "/:id",
  validateRequest(branchSchemas.update),
  branchController.updateBranch
);
router.delete("/:id", branchController.deleteBranch);

export default router;
