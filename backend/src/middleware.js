import jwt from "jsonwebtoken";

import { DA_PROJECT_AUTH_TOKEN } from "./constants.js";

/**
 * @type {express.Handler}
 */
export const verifyRequest = (req, res, next) => {
	try {
		const payload = jwt.verify(req.cookies[DA_PROJECT_AUTH_TOKEN], process.env.SECRET);
		res.locals = payload;
		return next();
	} catch (error) {
		console.error(error.message, error);
		return res.status(400).send("Unauthorized Request");
	}
};
