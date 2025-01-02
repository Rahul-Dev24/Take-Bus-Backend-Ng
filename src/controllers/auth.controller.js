import { catchError, ErrorHandeler } from "../middlewares/Error.middleware.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/genrateOTP.js";
import { sendVerificationCode } from "../utils/OtpSender.js";

export const regester = catchError(async (req, res, next) => {
    try {
        const { name, password, phoneNo, email } = req.body;
        const role = req.params.userType;

        if (!name || !password || !role || !phoneNo || !email) return next(new ErrorHandeler("All fields are required.", 400));

        // const exitUser = await User.findOne({
        //     $or: [
        //         {
        //             email,
        //             isActive: true
        //         },
        //         {
        //             phoneNo,
        //             isActive: true
        //         }
        //     ]
        // }) || null;


        // if (exitUser) return next(new ErrorHandeler("Phone or Email is already Exist.", 400));

        // const signUpAttemptsByUser = await User.find({
        //     $or: [
        //         { phoneNo, isActive: false },
        //         { email, isActive: false },
        //     ]
        // });

        // if (signUpAttemptsByUser?.length > 3) return next(new ErrorHandeler("You have exceeded the maximum of attemps (3). Please try again after an hour.", 400));

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
        // const user = await User.findOne({ _id: userId });

        res.status(200).json({ "message": "OTP sended" })

    } catch (err) {
        next(err)
    }
});

