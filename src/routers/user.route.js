import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRoute = express();

userRoute.put("/updateUser", auth, updateUser);

export default userRoute;
