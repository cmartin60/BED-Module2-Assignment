import express from "express";
import { getEmployeesByBranch, getEmployeesByDepartment } from "../controllers/logicalController";

const router = express.Router();

/**
 * @route GET /api/v1/logical/branch/:branchId/employees
 * @description Get all employees belonging to a specific branch.
 */
router.get("/branches/:branchId/employees", getEmployeesByBranch);

/**
 * @route GET /api/v1/logical/department/:department/employees
 * @description Get all employees belonging to a specific department.
 */
router.get("/departments/:department/employees", getEmployeesByDepartment);


export default router;
