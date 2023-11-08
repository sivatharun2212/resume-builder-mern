import { Router } from "express";
import { signUp, login } from "../controllers/authController.js";
export const router = Router();

router.post("/signup", signUp);

router.post("/login", login);
