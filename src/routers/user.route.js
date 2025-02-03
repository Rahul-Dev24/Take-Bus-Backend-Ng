import express from "express";
import { updateUser, getUserData } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRoute = express();

userRoute.put("/updateUser", auth, updateUser);
userRoute.get("/getUser", auth, getUserData);

export default userRoute;
