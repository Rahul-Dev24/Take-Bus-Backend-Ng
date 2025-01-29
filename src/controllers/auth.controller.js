import { catchError, ErrorHandeler } from "../middlewares/Error.middleware.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/genrateOTP.js";
import jwt from "jsonwebtoken";
import { sendVerificationCode } from "../utils/OtpSender.js";

export const regester = catchError(async (req, res, next) => {
    try {
        const { name, password, phoneNo, email } = req.body;
        const role = req.params.userType;

        if (!name || !password || !role || !phoneNo || !email) return next(new ErrorHandeler("All fields are required.", 400));

        const user = new User({
            name, password, role, phoneNo, email
        });
        const verificationCode = user?.generateVarificationCode();

        await user.save();

        // sendVerificationCode("email", verificationCode, email, phoneNo);
        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
});


export const verifyByOtp = catchError(async (req, res, next) => {
    try {
        const { otp, userId } = req.body;

        if (!otp || !userId) return next(new ErrorHandeler("All Fields are require.", 400));

        const user = await User.findOne({ _id: userId });

        if (Date.now() > new Date(user.verificationExpire).getTime()) return next(new ErrorHandeler("OTP Expired, Please try again.", 400));

        if (user?.isActive) return next(new ErrorHandeler("Account is already verified.", 400));

        if (user?.verificationCode == otp) {
            await User.findOneAndUpdate({ _id: userId }, { $set: { isActive: true } });
            return res.status(200).json({
                "success": true,
                "message": "Account verified Successfully."
            })
        }
        res.status(400).json({
            "success": false,
            "message": "Invalid OTP."
        })
    } catch (err) {
        next(err)
    }
});

export const reSendOtp = catchError(async (req, res, next) => {
    try {
        const { userId } = req.body;

        if (!userId) return next(new ErrorHandeler("User Id is not found.", 400));

        const otp = generateOtp()

        await User.updateOne({ _id: userId }, {
            $set: {
                verificationCode: otp,
                verificationExpire: Date.now() + 5 * 60 * 1000
            }
        })
        res.status(200).json({
            "success": true,
            "message": "OTP sended"
        })

    } catch (err) {
        next(err)
    }
});

export const forgotPassword = catchError(async (req, res, next) => {
    const { email } = req.body;

    if (!email) return next(new ErrorHandeler("All fields are required.", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandeler("Email is not found.", 400));
    if (!user?.isActive) return next(new ErrorHandeler("Email is not verified.", 400));
    // sendVerificationCode("email", verificationCode, email, phoneNo);

    res.status(200).json({
        "success": true,
        "message": "Check your mail for reset password."
    });
});

export const resetPassword = catchError(async (req, res, next) => {
    const { userId, password } = req.body;

    if (!userId || !password) return next(new ErrorHandeler("All fields are required.", 400));
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) return next(new ErrorHandeler("Url is Wrong, Please try again."));
        user['password'] = password;
        await user.save();

        res.status(200).json({
            "success": true,
            "message": "Password Changed."
        });
    } catch (err) {
        next(new ErrorHandeler("Url is Wrong, Please try again."));
    }
});

export const login = catchError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandeler("All fields are required.", 400));
    try {
        const user = await User.findOne({ email })?.select("+password");
        if (!user) return next(new ErrorHandeler("User Not Found.", 400));
        if (!user?.isActive) return next(new ErrorHandeler("Email is not verified.", 400));

        const tokenObj = {
            id: user?._id,
            permission: user?.permission,
            email: user?.email,
            role: user?.role
        }

        if (user.comparePassword(password)) {
            const authToken = await jwt.sign(tokenObj, process.env.SECRATE, {
                expiresIn: process.env.JWT_EXPIRE
            });
            res.status(200).cookie("token", authToken, {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: true
            }).json({
                "success": true,
                "message": "Login Successfully.",
                "token":authToken
            });

        } else {
            res.status(400).json({
                "success": false,
                "message": "Password is Incorrect."
            });
        }
    } catch (err) {
        next(err);
    }
});
