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
 * @returns {Promise<void>}
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
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        
        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee Retrieved", data: employee });
    } catch (error) {
        next(error);
    }
};