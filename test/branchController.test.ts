import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "../src/api/v1/models/branchModel";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
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


  describe("createBranch", () => {
    it("should handle successful creation", async () => {
      const mockBody = { name: "Main Branch", address: "123 Main St", phone: "555-1234" };
      const mockBranch: Branch = { id: "1", ...mockBody };

      mockReq.body = mockBody;
      (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Created",
        data: mockBranch,
      });
    });

    it("should forward errors to next middleware", async () => {
      const error = new Error("Service failure");
      (branchService.createBranch as jest.Mock).mockRejectedValue(error);

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });


  describe("getAllBranches", () => {
    it("should handle successful retrieval", async () => {
      const mockBranches: Branch[] = [
        { id: "1", name: "Branch 1", address: "123 St", phone: "555-1111" },
      ];

      (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branches Retrieved",
        data: mockBranches,
      });
    });

    it("should call next(error) when service throws", async () => {
      const error = new Error("Database error");
      (branchService.getAllBranches as jest.Mock).mockRejectedValue(error);

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

 
  describe("getBranchById", () => {
    it("should handle successful retrieval", async () => {
      const mockBranch: Branch = {
        id: "1",
        name: "Branch 1",
        address: "123 St",
        phone: "555-1111",
      };

      mockReq.params = { id: "1" };
      (branchService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Retrieved",
        data: mockBranch,
      });
    });

    it("should forward errors when branch not found", async () => {
      const error = new Error("Branch not found");
      mockReq.params = { id: "999" };
      (branchService.getBranchById as jest.Mock).mockRejectedValue(error);

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("updateBranch", () => {
    it("should handle successful update", async () => {
      const mockBranch: Branch = {
        id: "1",
        name: "Branch 1",
        address: "123 St",
        phone: "555-1111",
      };

      mockReq.params = { id: "1" };
      mockReq.body = { address: "456 Updated St" };
      (branchService.updateBranch as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Updated",
        data: mockBranch,
      });
    });

    it("should call next(error) when service throws", async () => {
      const error = new Error("Update failed");
      mockReq.params = { id: "1" };
      mockReq.body = {};
      (branchService.updateBranch as jest.Mock).mockRejectedValue(error);

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteBranch", () => {
    it("should handle successful deletion", async () => {
      mockReq.params = { id: "1" };
      (branchService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch Deleted",
      });
    });

    it("should call next(error) when service throws", async () => {
      const error = new Error("Branch not found");
      mockReq.params = { id: "999" };
      (branchService.deleteBranch as jest.Mock).mockRejectedValue(error);

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
