import express from "express";
import { imageUpload } from "../controllers/userHomePage.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const userRoute = express();

userRoute.put("/updateUser", auth, imageUpload);

export default userRoute;