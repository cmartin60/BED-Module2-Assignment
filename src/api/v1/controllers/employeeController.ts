import { Request, Response, NextFunction } from "express";
import { Employee } from "../models/employeeModel";
import { employeeService } from "../services/employeeService"; 

/**
 * @description Create a new employee.
 * @route POST /api/v1/employees
 * @returns {Promise<void>}
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