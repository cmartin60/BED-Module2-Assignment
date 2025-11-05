import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validation/schemas";

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new Branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Main Branch"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City"
 *               phone:
 *                 type: string
 *                 example: "+1-555-555-5555"
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 */
router.post(
  "/",
  validateRequest(branchSchemas.create),
  branchController.createBranch
);


/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieve a list of branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);


/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);


/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Branch not found
 */
router.put(
  "/:id",
  validateRequest(branchSchemas.update),
  branchController.updateBranch
);


/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       204:
 *         description: Branch deleted successfully (no content)
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
