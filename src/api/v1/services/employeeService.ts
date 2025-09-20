import { Employee } from "../models/employeeModel";

const employees: Employee[] = [];

/**
 * @description Create a new employee.
 * @param {Omit<Employee, 'id'>} employee - The employee data.
 * @returns {Promise<Employee>} newly created employee
 */

export const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee> => {
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>} all employee
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};