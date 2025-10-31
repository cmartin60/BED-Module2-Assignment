import * as branchService from "../src/api/v1/services/branchService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Branch } from "../src/api/v1/models/branchModel";


// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Branch Service", () => {

    it("should get all branches", async () => {
        // Arrange
        const mockSnapshot = {
            docs: [
                { id: "1", data: () => ({ name: "Branch 1", address: "A", phone: "111" }) },
                { id: "2", data: () => ({ name: "Branch 2", address: "B", phone: "222" }) }
            ]
        };
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        // Act
        const result = await branchService.getAllBranches();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("branches");
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe("Branch 1");
    });

    it("should get a branch by id", async () => {
        // Arrange
        const mockDoc = { id: "1", data: () => ({ name: "Branch 1", address: "A", phone: "111" }) };
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        // Act
        const result = await branchService.getBranchById("1");

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("branches", "1");
        expect(result.id).toBe("1");
        expect(result.name).toBe("Branch 1");
    });

    it("should update a branch", async () => {
        // Arrange
        const mockDocId = "test-branch-id";
        const mockBranch = {
            id: mockDocId,
            name: "Test Branch",
            address: "123 Main St",
            phone: "555-1234"
        };
        const updateData = {
            name: "Updated Branch",
            address: "456 Elm St",
            phone: "555-5678"
        };
        jest.spyOn(branchService, "getBranchById").mockResolvedValue(mockBranch);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result = await branchService.updateBranch(mockDocId, updateData);

        // Assert
        expect(branchService.getBranchById).toHaveBeenCalledWith(mockDocId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "branches",
            mockDocId,
            expect.objectContaining(updateData)
        );
        expect(result.name).toBe("Updated Branch");
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a branch successfully", async () => {
        // Arrange
        const mockBranchData = {
            name: "Test Branch",
            address: "123 Main St",
            phone: "555-1234"
        };
        const mockDocumentId = "test-branch-id";
        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        // Act
        const result: Branch = await branchService.createBranch(mockBranchData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "branches",
            expect.objectContaining({
                name: mockBranchData.name,
                address: mockBranchData.address,
                phone: mockBranchData.phone
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockBranchData.name);
    });

    it("should delete a branch successfully", async () => {
        // Arrange
        const mockDocumentId = "test-branch-id";
        const mockBranch: Branch = {
            id: mockDocumentId,
            name: "Test Branch",
            address: "123 Main St",
            phone: "555-1234"
        };
        // jest.spyOn creates a mock for a specific method/function on an object, in our example the branchService
        jest.spyOn(branchService, "getBranchById").mockResolvedValue(mockBranch);
        // jest.Mock replaces the auto-mocked version with our specific mocked implementation
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await branchService.deleteBranch(mockDocumentId);

        // Assert
        expect(branchService.getBranchById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "branches",
            mockDocumentId
        );
    });
});