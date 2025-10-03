import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Employee } from "../models/employeeModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "employees";

/**
 * Retrieves all employees from Firestore
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Employee;
        });
        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Creates a new employee
 * @param employeeData - The data for the new employee
 * @returns The created employee with generated ID
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const newEmployee: Partial<Employee> = {
        ...employeeData,
    };
    const employeeId: string = await createDocument<Employee>(COLLECTION, newEmployee);
    return structuredClone({ id: employeeId, ...newEmployee } as Employee);
};

/**
 * Retrieves a single employee by ID from Firestore
 * @param id - The ID of the employee to retrieve
 * @returns The employee if found
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const employee: Employee = {
        id: doc.id,
        ...data,
    } as Employee;

    return structuredClone(employee);
};

/**
 * Updates an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - The fields to update
 * @returns The updated employee
 * @throws Error if employee with given ID is not found
 */
export const updateEmployee = async (
    id: string,
    employeeData: Partial<Omit<Employee, "id">>
): Promise<Employee> => {
    const employee: Employee = await getEmployeeById(id);
    if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const updateEmployee: Employee = {
        ...employee,
    };
    if (employeeData.name !== undefined) updateEmployee.name = employeeData.name;
    if (employeeData.position !== undefined) updateEmployee.position = employeeData.position;
    if (employeeData.department !== undefined) updateEmployee.department = employeeData.department;
    if (employeeData.email !== undefined) updateEmployee.email = employeeData.email;
    if (employeeData.phone !== undefined) updateEmployee.phone = employeeData.phone;
    if (employeeData.branchId !== undefined) updateEmployee.branchId = employeeData.branchId;

    await updateDocument<Employee>(COLLECTION, id, updateEmployee);
    return structuredClone(updateEmployee);
};

/**
 * Deletes an employee from Firestore
 * @param id - The ID of the employee to delete
 * @throws Error if employee with given ID is not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const employee: Employee = await getEmployeeById(id);
    if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};