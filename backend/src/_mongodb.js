import mongoose from "mongoose";
import { IS_PRODUCTION } from "./constants.js";
const MONGODB_URI = IS_PRODUCTION
	? process.env.MONGODB_URI
	: "mongodb://localhost:27017/digital_alpha";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoCreate: true,
		});

		console.info("MongoDB database connection established successfully");
	} catch (error) {
		console.error(error.message);
		console.info("MongoDB connection error. Please make sure MongoDB is running.");
		process.exit(1);
	}
};
export default connectToMongoDB;
