import express from "express";
import { createResume } from "../controllers/resumeController.js";
export const router = express.Router();

router.post("/", createResume);
