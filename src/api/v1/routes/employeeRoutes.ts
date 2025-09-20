import express from "express";
import { createEmployee, getAllEmployees, getEmployeeById, } from "../controllers/employeeController";

const router = express.Router();

/**
 * Employee routes
 * POST /api/v1/employees - Create a new employee
 */

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);

export default router;