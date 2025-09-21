import { Request, Response, NextFunction } from "express";
import { Employee } from "../models/employeeModel";
import * as employeeService from "../services/employeeService";

/**
 * Get all employees for a specific branch.
 * @route GET /api/v1/logical/branch/:branchId/employees
 */
export const getEmployeesByBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { branchId } = req.params;
    const employees: Employee[] = await employeeService.getAllEmployees();

    const branchEmployees = employees.filter(
      (emp) => emp.branchId.toString() === branchId
    );

    res.status(200).json({
      message: "Employees Retrieved for Branch",
      data: branchEmployees,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all employees for a specific department.
 * @route GET /api/v1/logical/department/:department/employees
 */
export const getEmployeesByDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { department } = req.params;
    const employees: Employee[] = await employeeService.getAllEmployees();

    const departmentEmployees = employees.filter(
      (emp) => emp.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).json({
      message: "Employees Retrieved for Department",
      data: departmentEmployees,
    });
  } catch (error) {
    next(error);
  }
};