import { Request, Response, NextFunction } from "express";
import { Branch } from "../models/branchModel";
import * as branchService from "../services/branchService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse} from "../models/responseModel";

/**
 * @description Create a new branch.
 * @route POST /branches
 * @returns {Promise<void>}
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, address, phone } = req.body;
        const newBranch: Branch = await branchService.createBranch({ name, address, phone });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch Created")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get all branches.
 * @route GET /branches
 * @returns {Promise<void>}
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches Retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Get a branch by ID.
 * @route GET /branches/:id
 * @returns {Promise<void>}
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const branch: Branch = await branchService.getBranchById(id);
        if (!branch) {
            res.status(HTTP_STATUS.NOT_FOUND).json(
                successResponse(null, "Branch not found")
            );
            return;
        }
        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branch Retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Update an existing branch.
 * @route PUT /branches/:id
 * @returns {Promise<void>}
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;
        const updatedBranch: Branch = await branchService.updateBranch(id, { name, address, phone });
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branch Updated")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @description Delete a branch.
 * @route DELETE /branches/:id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await branchService.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Branch Deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};