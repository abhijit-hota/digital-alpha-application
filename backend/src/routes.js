import express from "express";
import { login, getDetails, logout } from "./controller.js";
import { verifyRequest } from "./middleware.js";
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/courses", verifyRequest, getDetails);

export default userRouter;
