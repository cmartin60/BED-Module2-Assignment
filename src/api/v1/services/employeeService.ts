import { Employee } from "../models/employeeModel";

const employees: Employee[] = [];

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>} retrieves all employee
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

/**
 * @description Create a new employee.
 * @param {Omit<Employee, 'id'>} employee - The employee data.
 * @returns {Promise<Employee>} newly created employee
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const newEmployee: Employee = {
        id: Date.now().toString(),
        ...employeeData,
    };
    employees.push(newEmployee);
    return structuredClone(newEmployee);
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {Partial<Employee>} updates - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
    id: string,
    employeeData: Partial<Omit<Employee, "id">>
): Promise<Employee> => {
    const index: number = employees.findIndex((emp: Employee) => emp.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }
    employees[index] = {
        ...employees[index],
        ...employeeData,
    };
    return structuredClone(employees[index]);
};

/**
 * @description Get an employee by ID.
 * @param {string} id - The ID of the employee to retrieve.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const employee: Employee | undefined = employees.find((emp) => emp.id === id);
    if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }
    return structuredClone(employee);
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex((emp: Employee) => emp.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }
    employees.splice(index, 1);
};