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
  });
});
