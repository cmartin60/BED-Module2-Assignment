import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Employee } from "../src/api/v1/models/employeeModel";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    it("should get all employees", async () => {
        // Arrange
        const mockSnapshot = {
            docs: [
                { id: "1", data: () => ({ name: "Emp 1", position: "Dev", department: "Eng", email: "a@a.com", phone: "111", branchId: 1 }) },
                { id: "2", data: () => ({ name: "Emp 2", position: "QA", department: "QA", email: "b@b.com", phone: "222", branchId: 2 }) }
            ]
        };
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        // Act
        const result = await employeeService.getAllEmployees();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("employees");
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("Emp 1");
    });

    it("should get an employee by id", async () => {
        // Arrange
        const mockDoc = { id: "1", data: () => ({ name: "Emp 1", position: "Dev", department: "Eng", email: "a@a.com", phone: "111", branchId: 1 }) };
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        // Act
        const result = await employeeService.getEmployeeById("1");

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("employees", "1");
        expect(result.id).toBe("1");
        expect(result.name).toBe("Emp 1");
    });

    it("should update an employee", async () => {
        // Arrange
        const mockDocId = "test-employee-id";
        const mockEmployee = {
            id: mockDocId,
            name: "Test Employee",
            position: "Developer",
            department: "Engineering",
            email: "test@example.com",
            phone: "555-1234",
            branchId: 1
        };
        const updateData = {
            name: "Updated Employee",
            position: "Lead Developer",
            department: "Engineering",
            email: "updated@example.com",
            phone: "555-5678",
            branchId: 2
        };
        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result = await employeeService.updateEmployee(mockDocId, updateData);

        // Assert
        expect(employeeService.getEmployeeById).toHaveBeenCalledWith(mockDocId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "employees",
            mockDocId,
            expect.objectContaining(updateData)
        );
        expect(result.name).toBe("Updated Employee");
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {
        // Arrange
        const mockEmployeeData = {
            name: "Test Employee",
            position: "Developer",
            department: "Engineering",
            email: "test@example.com",
            phone: "555-1234",
            branchId: 1
        };
        const mockDocumentId = "test-employee-id";
        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        // Act
        const result: Employee = await employeeService.createEmployee(mockEmployeeData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "employees",
            expect.objectContaining({
                name: mockEmployeeData.name,
                position: mockEmployeeData.position,
                department: mockEmployeeData.department,
                email: mockEmployeeData.email,
                phone: mockEmployeeData.phone,
                branchId: mockEmployeeData.branchId
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEmployeeData.name);
    });

    it("should delete an employee successfully", async () => {
        // Arrange
        const mockDocumentId = "test-employee-id";
        const mockEmployee: Employee = {
            id: mockDocumentId,
            name: "Test Employee",
            position: "Developer",
            department: "Engineering",
            email: "test@example.com",
            phone: "555-1234",
            branchId: 1
        };
        // jest.spyOn creates a mock for a specific method/function on an object, in our example the employeeService
        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee);
        // jest.Mock replaces the auto-mocked version with our specific mocked implementation
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await employeeService.deleteEmployee(mockDocumentId);

        // Assert
        expect(employeeService.getEmployeeById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "employees",
            mockDocumentId
        );
    });
});