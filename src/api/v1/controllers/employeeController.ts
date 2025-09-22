import { Request, Response, NextFunction } from "express";
import { Employee } from "../models/employeeModel";
import * as employeeService from "../services/employeeService";

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
        const newEmployee: Employee = await employeeService.createEmployee(req.body);
        res.status(201).json({ message: "Employee Created", data: newEmployee });
    } catch (error) {
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
        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch (error) {
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
        const employee: Employee = await employeeService.getEmployeeById(req.params.id);
        
        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee Retrieved", data: employee });
    } catch (error) {
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
        const updatedEmployee: Employee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );
        res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
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
        await employeeService.deleteEmployee(req.params.id);
        res.status(200).json({ message: "Employee Deleted" });
    } catch (error) {
        next(error);
    }
};