import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";

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
        const newBranch: Branch = await branchService.createBranch(req.body);
        res.status(201).json({ message: "Branch Created", data: newBranch });
    } catch (error) {
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
        res.status(200).json({ message: "Branches Retrieved", data: branches });
    } catch (error) {
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
        const branch = await branchService.getBranchById(req.params.id);
        
        if (!branch) {
            res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json({ message: "Branch Retrieved", data: branch });
    } catch (error) {
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
        const updatedBranch: Branch = await branchService.updateBranch(
            req.params.id,
            req.body
        );
        res.status(200).json({ message: "Branch Updated", data: updatedBranch });
    } catch (error) {
        next(error);
    }
};