import { catchError, ErrorHandeler } from "../../middlewares/Error.middleware.js";
import Category from "../../models/category.model.js"

export const getCategory = catchError(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Items per page (default: 10)

        const total = await Category.countDocuments(); // Total number of categories
        const allCategory = await Category.find()
            .skip((page - 1) * limit) // Skip items of previous pages
            .limit(limit); // Limit the number of items per page
        if (!allCategory) return next(new ErrorHandeler("Category Not Found.", 401));
        res.status(200).json({
            success: true,
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: allCategory,
        });
    } catch (err) {
        next(err);
    }

});

export const addCategory = catchError(async (req, res, next) => {
    try {
        const { name, image, status, imgId } = req?.body;
        if (!name) return next(new ErrorHandeler("All Feilds are required.", 401));
        const category = new Category({
            name,
            image,
            status,
            imgId
        });
        await category.save();
        res?.status(200).json({
            success: true,
            message: "Category Created Successfully."
        });
    } catch (err) {
        next(err);
    }
});

export const editCategory = catchError(async (req, res, next) => {
    try {
        const _id = req?.params?._id;
        const { name, image, status, imgId } = req?.body;
        if (!name || !_id) return next(new ErrorHandeler("All Feilds are required.", 401));
        const obj = image && imgId ? {
             name,
                image,
                status,
                imgId
        } : {
             name,
                status,
        } ;
        await Category.updateOne({ _id }, {
            $set: {...obj}
        });
        res.status(200).json({
            success: true,
            message: "Category Updated Successfully."
        })
    } catch (err) {
        next(err);
    }
});

export const deleteCategory = catchError(async (req, res, next) => {
    try {
        const _id = req?.params?._id;
        if (!_id) return next(new ErrorHandeler("Category Id is required.", 401));
        await Category.deleteOne({ _id });
        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully."
        })
    } catch (err) {
        next(err)
    }
});
