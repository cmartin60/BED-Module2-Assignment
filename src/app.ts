// import the express application and type definition
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables BEFORE you internal imports!
dotenv.config();

import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsConfig } from "../config/corsConfig";
import setupSwagger from "../config/swagger";


// initialize the express application
const app: Express = express();

// Interface for health check response
// An interface in TypeScript defines the structure or "shape" of an object.
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
// Middleware START
app.use(morgan("combined"));
app.use(helmet());
app.use(helmet(getHelmetConfig()));
app.use(cors());
app.use(cors(getCorsConfig()));

// Ensures incoming body is correctly parsed to JSON, otherwise req.body would be undefined
app.use(express.json());

// Middleware END

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

setupSwagger(app);

export default app;