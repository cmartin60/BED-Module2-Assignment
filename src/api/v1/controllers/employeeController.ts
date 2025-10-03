import { Request, Response, NextFunction } from "express";
import { Employee } from "../models/employeeModel";
import * as employeeService from "../services/employeeService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new employee.
 * @route POST /employees
 * @returns {Promise<void>} creation of new employee.
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
    const { name, position, department, email, phone, branchId } = req.body;
        const newEmployee: Employee = await employeeService.createEmployee({ name, position, department, email, phone, branchId });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee Created")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get all employees.
 * @route GET /employees
 * @returns {Promise<void>} send list of all employees.
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees Retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get an employee by ID.
 * @route GET /employees/:id
 * @returns {Promise<void>} send employee data or error if id not found 
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const employee: Employee = await employeeService.getEmployeeById(id);
        if (!employee) {
            res.status(HTTP_STATUS.NOT_FOUND).json(
                successResponse(null, "Employee not found")
            );
            return;
        }
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "Employee Retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Update an existing employee.
 * @route PUT /employees/:id
 * @returns {Promise<void>} send updated employee
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, position, department, email, phone, branchId } = req.body;
        const updatedEmployee: Employee = await employeeService.updateEmployee(id, { name, position, department, email, phone, branchId });
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee Updated")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Delete an employee.
 * @route DELETE /employees/:id
 * @returns {Promise<void>} deletes and employee 
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await employeeService.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Employee Deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};

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
        const branchEmployees: Employee[] = employees.filter(
            (emp) => emp.branchId.toString() === branchId
        );
        res.status(HTTP_STATUS.OK).json(
            successResponse(branchEmployees, "Employees Retrieved for Branch")
        );
    } catch (error: unknown) {
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
        const departmentEmployees: Employee[] = employees.filter(
            (emp) => emp.department.toLowerCase() === department.toLowerCase()
        );
        res.status(HTTP_STATUS.OK).json(
            successResponse(departmentEmployees, "Employees Retrieved for Department")
        );
    } catch (error: unknown) {
        next(error);
    }
};