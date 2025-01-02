import express from "express"
import { regester, verifyByOtp, reSendOtp } from "../controllers/auth.controller.js";

const authRoutes = express();

authRoutes.post("/signup/:userType", regester);
authRoutes.post("/otp", verifyByOtp);
authRoutes.post("/OTPresent", reSendOtp)

export default authRoutes;