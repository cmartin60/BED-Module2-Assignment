import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/schemas";

const router: Router = express.Router();


router.post(
	"/",
	validateRequest(employeeSchemas.create),
	employeeController.createEmployee
);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put(
	"/:id",
	validateRequest(employeeSchemas.update),
	employeeController.updateEmployee
);
router.delete("/:id", employeeController.deleteEmployee);

router.get("/branches/:branchId/employees", employeeController.getEmployeesByBranch);
router.get("/departments/:department/employees", employeeController.getEmployeesByDepartment);


export default router;