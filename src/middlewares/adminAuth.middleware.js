import { catchError, ErrorHandeler } from "./Error.middleware.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = catchError(async (req, res, next) => {
    const token = req?.headers['authorization']?.split(' ')[1] || req.cookies['token'];
    try {
        if (!token) return next(new ErrorHandeler("Please login to access this resource", 401));
        const decoded = await jwt.verify(token, process.env.SECRATE);
        if (!decoded.id) return next(new ErrorHandeler("Invalid token. Please login again.", 401));
        const user = await User.findOne({ _id: decoded?.id });
        if (!user) return next(new ErrorHandeler("User not found. Please login again.", 401));
        if (user?.role !== "admin") return next(new ErrorHandeler("I can able to access this resource.", 401));
        next();
    } catch (err) {
        next(err);
    }

})
