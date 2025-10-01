import express, { Router } from "express";
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee,getEmployeesByBranch, getEmployeesByDepartment} from "../controllers/employeeController";

const router: Router = express.Router();


router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/branches/:branchId/employees", getEmployeesByBranch);
router.get("/departments/:department/employees", getEmployeesByDepartment);


export default router;