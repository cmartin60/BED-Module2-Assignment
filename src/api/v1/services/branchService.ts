import { Branch } from "../models/branchModel";

const branches: Branch[] = [];

/**
 * @description Create a new branch.
 * @param {Omit<Branch, 'id'>} branch - The branch data.
 * @returns {Promise<Branch>} new branch created
 */
export const createBranch = async (branch: Omit<Branch, "id">): Promise<Branch> => {
    const newBranch: Branch = { id: Date.now().toString(), ...branch };
    branches.push(newBranch);
    return newBranch;
};

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
};