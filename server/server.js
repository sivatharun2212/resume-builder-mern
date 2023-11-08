import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/authRoutes.js";
import { router as resumeRouter } from "./routes/resumeRoutes.js";

import { connectDB } from "./config/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/resume", resumeRouter);
app.use(errorHandler);
app.listen(5000, () => {
	console.log(`server is running on port 5000`);
});
