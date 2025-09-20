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
});
