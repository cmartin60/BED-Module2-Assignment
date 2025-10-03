import { Branch } from "../models/branchModel";

const branches: Branch[] = [];

/**
 * Retrieves all branches from storage
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return structuredClone(branches);
};

/**
 * Creates a new branch
 * @param branchData - The data for the new branch (name, address, phone)
 * @returns The created branch with generated ID
 */
export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    const newBranch: Branch = {
        id: Date.now().toString(),
        ...branchData,
    };
    branches.push(newBranch);
    return structuredClone(newBranch);
};

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const updateBranch = async (
    id: string,
    branchData: Partial<Omit<Branch, "id">>
): Promise<Branch> => {
    const index: number = branches.findIndex((branch: Branch) => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    branches[index] = {
        ...branches[index],
        ...branchData,
    };
    return structuredClone(branches[index]);
};

/**
 * @description Get a branch by ID.
 * @param {string} id - The ID of the branch to retrieve.
 * @returns {Promise<Branch | null>}
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const branch: Branch | undefined = branches.find((branch) => branch.id === id);
    if (!branch) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    return structuredClone(branch);
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index: number = branches.findIndex((branch: Branch) => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    branches.splice(index, 1);
};