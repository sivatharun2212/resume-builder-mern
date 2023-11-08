import { resumeModel } from "../models/resumeModel.js";

export const createResume = async (req, res) => {
	const { name } = req.body;
	try {
		const newResume = await resumeModel.create({ name });

		if (newResume) {
			res.status(201).json({ message: `resume created for ${name}` });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
