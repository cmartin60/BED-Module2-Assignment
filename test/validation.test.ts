import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { employeeSchemas, branchSchemas } from "../src/api/v1/validation/schemas";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = { body: {}, params: {}, query: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid employee data", () => {
        mockReq.body = {
            name: "John Doe",
            position: "Manager",
            email: "john@example.com",
            branchId: "12345",
        };
        const middleware: MiddlewareFunction = validateRequest(employeeSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation for invalid employee data", () => {
        mockReq.body = {
            name: "",
            position: "",
            email: "not-an-email",
            branchId: "",
        };
        const middleware: MiddlewareFunction = validateRequest(employeeSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Name cannot be empty"),
        });
    });

    it("should pass validation for valid branch data", () => {
        mockReq.body = {
            name: "Main Branch",
            address: "123 Main St",
            phone: "+1234567890",
        };
        const middleware: MiddlewareFunction = validateRequest(branchSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation for invalid branch data", () => {
        mockReq.body = {
            name: "",
            address: "",
            phone: "abc",
        };
        const middleware: MiddlewareFunction = validateRequest(branchSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Phone must be a valid phone number"),
        });
    });
});