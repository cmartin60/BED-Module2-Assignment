import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Branch } from "../models/branchModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "branches";

/**
 * Retrieves all branches from storage
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Branch;
        });
        return branches;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Creates a new branch
 * @param branchData - The data for the new branch (name, address, phone)
 * @returns The created branch with generated ID
 */
export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    const newBranch: Partial<Branch> = {
        ...branchData,
    };
    const branchId: string = await createDocument<Branch>(COLLECTION, newBranch);
    return structuredClone({ id: branchId, ...newBranch } as Branch);
};

/**
 * Updates (replaces) an existing branch
 * @param id - The ID of the branch to update
 * @param branchData - The fields to updates (name, address, phone)
 * @returns The updated branch
 * @throws Error if branch with given ID is not found
 */
export const updateBranch = async (
    id: string,
    branchData: Partial<Branch>
): Promise<Branch> => {
    const branch: Branch = await getBranchById(id);
    if (!branch) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    const updateBranch: Branch = {
        ...branch,
    };

    if (branchData.name !== undefined) updateBranch.name = branchData.name;
    if (branchData.address !== undefined) updateBranch.address = branchData.address;
    if (branchData.phone !== undefined) updateBranch.phone = branchData.phone;

    await updateDocument<Branch>(COLLECTION, id, updateBranch);

    return structuredClone(updateBranch);
};

/**
 * @description Get a branch by ID.
 * @param {string} id - The ID of the branch to retrieve.
 * @returns {Promise<Branch | null>}
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const branch: Branch = {
        id: doc.id,
        ...data,
    } as Branch;

    return structuredClone(branch);
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const branch: Branch = await getBranchById(id);
    if (!branch) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};