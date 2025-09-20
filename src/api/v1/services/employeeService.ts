import { Employee } from "../models/employeeModel";

const employees: Employee[] = [];

/**
 * @description Create a new employee.
 * @param {Omit<Employee, 'id'>} employee - The employee data.
 * @returns {Promise<Employee>}
 */

export const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee> => {
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};