import { userModel } from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const signUp = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await userModel.findOne({ email });
		if (userExists) {
			res.status(400);
			throw new Error("user already exists");
		}
		const hashedPassword = await hash(password, 10);
		console.log("HP", hashedPassword);
		const user = await userModel.create({
			name,
			email,
			password: hashedPassword,
		});
		if (user) {
			res.status(201);
			res.json({ message: "user created" });
		} else {
			res.status(400);
			res.json({ message: "user not found" });
		}
	} catch (err) {
		console.log(err.message);
		res.json({ message: "error while creating user" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userExists = await userModel.findOne({ email });
		if (userExists && (await compare(password, userExists.password))) {
			const accessToken = jsonwebtoken.sign(
				{
					name: userExists.name,
					email: userExists.email,
					id: userExists._id,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "1w" }
			);
			res.json({ _id: userExists._id, accessToken });
		} else {
			res.json("user not exists");
		}
	} catch (err) {
		console.log(err.message);
	}
};

export { signUp, login };
