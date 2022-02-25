import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import "./constants.js";
import connectToMongoDB from "./_mongodb.js";
import router from "./routes.js";

const PORT = process.env.PORT || 5100;
const app = express();

const main = async () => {
	await connectToMongoDB();

	app.use(
		cors({
			credentials: true,
			origin: ["http://localhost:3001"],
		})
	);

	app.use(cookieParser());
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(compression({ level: 9 }));

	app.use("/", router);

	//Starting the server
	app.listen(PORT, () => {
		console.info(`Running in: [${process.env.NODE_ENV.toUpperCase()}]`);
		console.info(`API Server listening on port: ${PORT}`);
	});
};

main();
