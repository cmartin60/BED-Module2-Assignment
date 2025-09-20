import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("createEmployee", () => {
    it("should handle successful creation", async () => {
      const mockBody = {
        name: "John Doe",
        position: "Developer",
        department: "IT",
        email: "john.doe@example.com",
        phone: "555-1234",
        branchId: 1,
      };

      const mockEmployee: Employee = {
        id: "test_id",
        ...mockBody,
      };

      mockReq.body = mockBody;
      (employeeService.createEmployee as jest.Mock).mockReturnValue(mockEmployee);

      await employeeController.createEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Created",
        data: mockEmployee,
      });
    });

    it("should forward errors to next middleware", async () => {
      const error = new Error("Service failure");
      (employeeService.createEmployee as jest.Mock).mockRejectedValue(error);

      await employeeController.createEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  })

describe("getAllEmployees", () => {
    it("should handle successful retrieval", async () => {
      const mockEmployees: Employee[] = [
        { id: "1", name: "Alice", position: "Manager", department: "HR", email: "a@b.com", phone: "123", branchId: 1 },
      ];

      (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

      await employeeController.getAllEmployees(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employees Retrieved",
        data: mockEmployees,
      });
    });

    it("should call next(error) when service throws", async () => {
      const error = new Error("Database error");
      (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(error);

      await employeeController.getAllEmployees(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  /**
   * GET EMPLOYEE BY ID
   */
  describe("getEmployeeById", () => {
    it("should handle successful retrieval", async () => {
      const mockEmployee: Employee = {
        id: "1",
        name: "Alice",
        position: "Manager",
        department: "HR",
        email: "a@b.com",
        phone: "123",
        branchId: 1,
      };

      mockReq.params = { id: "1" };
      (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Retrieved",
        data: mockEmployee,
      });
    });

    it("should return 404 when employee is not found", async () => {
      mockReq.params = { id: "999" };
      (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(null);

      await employeeController.getEmployeeById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee not found",
      });
    });
  });

describe("updateEmployee", () => {
  it("should handle successful update", async () => {
    const mockEmployee: Employee = {
      id: "1",
      name: "Bob",
      position: "Engineer",
      department: "Tech",
      email: "bob@example.com",
      phone: "456",
      branchId: 2,
    };

    mockReq.params = { id: "1" };
    mockReq.body = { position: "Senior Engineer" };
    (employeeService.updateEmployee as jest.Mock).mockResolvedValue(mockEmployee);

    await employeeController.updateEmployee(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Employee Updated",
      data: mockEmployee,
    });
  });

  it("should call next(error) when service throws", async () => {
    mockReq.params = { id: "1" };
    mockReq.body = {}; // empty update
    const error = new Error("Update failed");
    (employeeService.updateEmployee as jest.Mock).mockRejectedValue(error);

    await employeeController.updateEmployee(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );
    
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

  describe("deleteEmployee", () => {
    it("should handle successful deletion", async () => {
      mockReq.params = { id: "1" };
      (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(undefined);

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Employee Deleted",
      });
    });

    it("should return 404 when employee not found", async () => {
      mockReq.params = { id: "999" };
      (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(new Error("Employee not found"));

      await employeeController.deleteEmployee(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});