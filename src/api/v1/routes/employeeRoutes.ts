import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/schemas";

const router: Router = express.Router();

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new Employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - email
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Jane Doe"
 *               position:
 *                 type: string
 *                 example: "Software Engineer"
 *               department:
 *                 type: string
 *                 example: "Engineering"
 *               phone:
 *                 type: string
 *                 example: "+1-555-555-5555"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.doe@example.com"
 *               branchId:
 *                 type: string
 *                 example: "branch_123"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Employee with this email already exists
 */
router.post(
	"/",
	validateRequest(employeeSchemas.create),
	employeeController.createEmployee
);

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               branchId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 *       409:
 *         description: Conflict (e.g. email already exists)
 */
router.put(
	"/:id",
	validateRequest(employeeSchemas.update),
	employeeController.updateEmployee
);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);

/**
 * @openapi
 * /employees/branches/{branchId}/employees:
 *   get:
 *     summary: Get employees by branch ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID to filter employees
 *     responses:
 *       200:
 *         description: List of employees in the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/branches/:branchId/employees", employeeController.getEmployeesByBranch);

/**
 * @openapi
 * /employees/departments/{department}/employees:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: Department name to filter employees
 *     responses:
 *       200:
 *         description: List of employees in the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/departments/:department/employees", employeeController.getEmployeesByDepartment);


export default router;