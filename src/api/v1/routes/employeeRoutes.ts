import express from "express";
import { createEmployee } from "../controllers/employeeController";

const router = express.Router();

/**
 * Employee routes
 * POST /api/v1/employees - Create a new employee
 */

router.post("/", createEmployee);

export default router;