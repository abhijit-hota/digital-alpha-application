import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String },
	roll: { type: String, unique: true, lowercase: true },
	cgpa: { type: Number },
	semesters: [
		{
			rank: Number,
			title: String,
			courses: [
				{
					code: String,
					title: String,
					category: String,
					credit: Number,
					grade: String,
					attendance: String,
				},
			],
			creditsEarned: Number,
			gpa: Number,
			cgpa: Number,
		},
	],

	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

userSchema.pre("updateOne", function (next) {
	this.updatedAt = Date.now();
	next();
});

export default mongoose.model("User", userSchema);
