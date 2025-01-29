import { catchError } from "../middlewares/Error.middleware.js";
import User from "../models/user.model.js";
import Image from '../models/image.model.js';

export const updateUser = catchError(async (req, res, next) => {
    try {
        const { name, phoneNo, email, address, profileImg } = req.body;

        if (!name || !address || !phoneNo || !email) return next(new ErrorHandeler("All fields are required.", 400));

        const user = await User.updateOne({ _id: req.user._id }, {
            $set: {
                name, phoneNo, email, address, profileImg
            }
        });
        if (!user) return next(new ErrorHandeler("Something went wrong. Please login again.", 401));

        res.status(200).json({
            message: "User Updated Successfully.",
            success: true
        });

    } catch (err) {
        next(err);
    }
})

export const getUserData = catchError(async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return next(new ErrorHandeler("Something went wrong. Please login again.", 401));
        const profileImage = await Image.findOne({ _id: user.profileImg });
        res.status(200).json({
            success: true,
            data: {
                user,
                profileImage
            }
        });
    } catch (err) {
        next(err);
    }
})
