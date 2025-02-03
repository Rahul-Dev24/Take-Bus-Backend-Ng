import { catchError, ErrorHandeler } from "../middlewares/Error.middleware.js";
import UserHomePage from "../models/userHomepage.model.js";
import ImageModel from "../models/image.model.js";

export const getUserPage = catchError(async (req, res, next) => {

    try {
        const pageData = await UserHomePage.findOne();
        if (!pageData) return next(new ErrorHandeler("Internal Server Error.", 500));
        res.status(200).json({
            "success": true,
            "data": pageData
        })
    } catch (err) {
        next(err);
    }
});

export const imageUpload = catchError(async (req, res, next) => {
    const { file } = req.body;
    try {
        if (!file) return next(new ErrorHandeler("File is Required.", 400));
        const newFile = await ImageModel.create(file);

        res.status(200).json({
            "success": true,
            "message": "File Uploaded Successfully.",
            "data": newFile
        });

    } catch (err) {
        next(err);
    }

});
