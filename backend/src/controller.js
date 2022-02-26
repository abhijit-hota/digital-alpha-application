import User from "./userModel.js";
import scrape from "./scraper.js";
import jwt from "jsonwebtoken";

import { DA_PROJECT_AUTH_TOKEN, IS_PRODUCTION, SECRET } from "./constants.js";

/**
 * @type {import("express").RequestHandler}
 */
export const login = async (req, res) => {
	const { roll, password } = req.body;
	try {
		const userData = await scrape({ roll, password });

		if (!userData) {
			return res.status(400).send({ message: "Invalid credentials." });
		}
		await User.updateOne(
			{ roll },
			{ cgpa: userData.cgpa, semesters: userData.semesters },
			{ upsert: true }
		).exec();

		const token = jwt.sign({ roll }, SECRET);
		const opts = IS_PRODUCTION ? { domain: "" } : {};

		res.cookie(DA_PROJECT_AUTH_TOKEN, token, {
			secure: IS_PRODUCTION,
			httpOnly: true,
			...opts,
		});

		return res.json({ message: "Successfully logged in." });
	} catch (error) {
		res.status(500).json({ message: "An error occurred" });
		console.error(error.message, error);
	}
};

/**
 * @type {import("express").RequestHandler}
 */
export const logout = async (req, res) => {
	try {
		const opts = IS_PRODUCTION ? { domain: "" } : {};
		res.clearCookie(DA_PROJECT_AUTH_TOKEN, {
			secure: IS_PRODUCTION,
			httpOnly: true,
			...opts,
		});

		res.json({ message: "Logged Out" });
	} catch (error) {
		if (error.code === 9090) {
			res.status(400).json({ message: "Unauthorized Request" });
		} else {
			console.error(error.message, error);
			res.status(500).json({ message: "An error occurred." });
		}
	}
};

/**
 * @type {import("express").RequestHandler}
 */
export const getDetails = async (req, res) => {
	try {
		const user = await User.findOne({ roll: res.locals.roll }).lean().exec();

		if (!user) {
			return res.status(400).send({ message: "Please login" });
		}

		return res.send(user);
	} catch (error) {
		res.status(500).send({ message: "An error occurred" });
		console.error(error.message, error);
	}
};
