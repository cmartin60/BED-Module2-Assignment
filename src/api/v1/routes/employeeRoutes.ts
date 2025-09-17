import express from "express";
import { createEmployee } from "../controllers/employeeController";

const router = express.Router();

router.post("/", createEmployee);

export default router;