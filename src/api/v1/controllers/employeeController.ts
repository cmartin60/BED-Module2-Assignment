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