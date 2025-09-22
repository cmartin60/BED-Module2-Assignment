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
  const branch: Branch | undefined = branches.find(b => b.id === id);
  if (!branch) {
    const error = new Error(`Branch with ID ${id} not found`) as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }
  return branch;
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} updates - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (id: string, updates: Partial<Branch>): Promise<Branch> => {
    const index: number = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    branches[index] = { ...branches[index], ...updates };
    return branches[index];
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index: number = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    branches.splice(index, 1);
};