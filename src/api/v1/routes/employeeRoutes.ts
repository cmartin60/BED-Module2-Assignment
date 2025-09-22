import express, { Router } from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee} from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * Employee routes
 * POST /api/v1/employees - Create a new employee
 */

/**
 * @route POST /api/v1/employees
 * @description Create a new employee.
 */
router.post("/", createEmployee);

/**
 * @route GET /api/v1/employees
 * @description Retrieve a list of all employees.

 */
router.get("/", getAllEmployees);

/**
 * @route GET /api/v1/employees/:id
 * @description Retrieve a single employee by ID.
 * @param {string} id - The unique identifier of the employee.
 */
router.get("/:id", getEmployeeById);

/**
 * @route PUT /api/v1/employees/:id
 * @description Update an existing employee by ID.
 * @param {string} id - The unique identifier of the employee.
 */
router.put("/:id", updateEmployee);

/**
 * @route DELETE /api/v1/employees/:id
 * @description Delete an employee by ID.
 * @param {string} id - The unique identifier of the employee.
 */
router.delete("/:id", deleteEmployee);

export default router;