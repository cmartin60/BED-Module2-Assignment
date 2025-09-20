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

/**
 * @description Get a branch by ID.
 * @param {string} id - The ID of the branch to retrieve.
 * @returns {Promise<Branch | null>}
 */
export const getBranchById = async (id: string): Promise<Branch> => {
  const branch = branches.find(b => b.id === id);
  if (!branch) {
    const error: any = new Error(`Branch with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  return branch;
};