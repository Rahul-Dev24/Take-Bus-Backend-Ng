import { catchError } from "../middlewares/Error.middleware";
import User from "../models/user.model";

export const updateUser = catchError(async (req, res, next) => {
    try {
        const { name, phoneNo, email, address } = req.body;

        if (!name || !address || !role || !phoneNo || !email) return next(new ErrorHandeler("All fields are required.", 400));

        const user = await User.updateOne({ _id: req.user._id }, {
            $set: {
                name, phoneNo, email, address
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