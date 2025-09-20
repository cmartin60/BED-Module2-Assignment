import request from "supertest";
import express from "express";
import branchRoutes from "../src/api/v1/routes/branchRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1/branches", branchRoutes);

describe("Branch Endpoints", () => {
  let branchId: string;

  it("should create a new branch", async () => {
    const response = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Main Branch",
        address: "123 Main St",
        phone: "555-1234"
      });

    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
    branchId = response.body.data.id;
  });

  it("should get all branches", async () => {
        const response = await request(app).get("/api/v1/branches");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();
    });
  it("should get a branch by ID", async () => {
        const response = await request(app).get(`/api/v1/branches/${branchId}`);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(branchId);
    });
});
