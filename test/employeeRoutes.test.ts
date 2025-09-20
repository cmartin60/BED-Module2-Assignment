import request from "supertest";
import express from "express";
import employeeRoutes from "../src/api/v1/routes/employeeRoutes";

const app = express();

app.use(express.json());

app.use("/api/v1/employees", employeeRoutes);

describe("Employee Directory Endpoints", () => {
  describe("POST /api/v1/employees", () => {
    it("should create a new employee and return the employee data with a unique ID", async () => {
      const newEmployee = {
        name: "John Doe",
        position: "Software Engineer",
        department: "IT",
        email: "john.doe@example.com",
        phone: "555-1234",
        branchId: 1,
      };

      const res = await request(app)
        .post("/api/v1/employees")
        .send(newEmployee)
        .expect(201);

      expect(res.body).toHaveProperty("message", "Employee Created");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toMatchObject(newEmployee);
      expect(res.body.data).toHaveProperty("id");
    });

    it("should get all employees", async () => {
        const response = await request(app).get("/api/v1/employees");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();
    });

  });

});