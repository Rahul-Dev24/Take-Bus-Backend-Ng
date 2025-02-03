import express from "express"
import { regester, verifyByOtp, reSendOtp, forgotPassword, resetPassword, login } from "../controllers/auth.controller.js";

const authRoutes = express();

authRoutes.post("/signup/:userType", regester);
authRoutes.post("/verifyOtp", verifyByOtp);
authRoutes.post("/OTPresent", reSendOtp);
authRoutes.post("/forgotPassword", forgotPassword);
authRoutes.post("/resetPassword", resetPassword);
authRoutes.post("/login", login);

export default authRoutes;