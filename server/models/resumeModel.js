import mongoose from "mongoose";

const schema = {
	name: {
		type: String,
		required: true,
	},
};

const resumeSchema = mongoose.Schema(schema, { timestamps: true });
export const resumeModel = mongoose.model("Resume", resumeSchema);
