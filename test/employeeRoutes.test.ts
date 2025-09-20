import request from "supertest";
import express from "express";
import employeeRoutes from "../src/api/v1/routes/employeeRoutes";

const app = express();

app.use(express.json());

app.use("/api/v1/employees", employeeRoutes);

describe("Employee Directory Endpoints", () => {
     let employeeId: string;

    it("should create a new employee", async () => {
        const response = await request(app)
            .post("/api/v1/employees")
            .send({
                name: "John Doe",
                position: "Software Engineer",
                department: "IT",
                email: "johndoe@example.com",
                phone: "1234567890",
                branchId: "1"
            });

        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        employeeId = response.body.data.id;
    });

    it("should get all employees", async () => {
        const response = await request(app).get("/api/v1/employees");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    it("should get an employee by ID", async () => {
        const response = await request(app).get(`/api/v1/employees/${employeeId}`);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(employeeId);
    });

    it("should update an employee", async () => {
        const response = await request(app)
            .put(`/api/v1/employees/${employeeId}`)
            .send({ position: "Senior Manager" });

        expect(response.status).toBe(200);
        expect(response.body.data.position).toBe("Senior Manager");
    });
});