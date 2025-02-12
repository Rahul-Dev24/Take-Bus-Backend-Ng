import { catchError, ErrorHandeler } from "../../middlewares/Error.middleware.js";
import Bus from "../../models/bus.model.js";
import { response } from "../../utils/responseFormate.js";


export const createBus = catchError(async (req, res, next) => {
    try {
        const { brand, model, seatCapacity, registrationNo } = req?.body;
        if (!brand || !model || !seatCapacity || !registrationNo) return next(new ErrorHandeler("All fields are required.", 400));
        const partnerId = req?.user?._id;
        if (!partnerId) return next(new ErrorHandeler("Partner Id is required."));
        const bus = new Bus({
            partnerId,
            brand,
            model,
            seatCapacity,
            registrationNo,
        });

        const data = await bus.save();
        res?.status(201).json(response(true, "Bus Created Successfully.", data));
    } catch (error) {
        next(error);
    }
});


export const updateBus = catchError(async (req, res, next) => {
    try {
        const { brand, model, seatCapacity, registrationNo } = req?.body;
        const _id = req?.params?._id;
        if (!_id || !brand || !model || !seatCapacity || !registrationNo) return next(new ErrorHandeler("All fields are required.", 400));

        const updatedBus = await Bus.updateOne({ _id }, {
            $set: {
                brand,
                model,
                seatCapacity,
                registrationNo,
            }
        });

        if (updateBus) {
            return res.status(200).json(response(true, "Bus Updated Successfully.", []));
        }
        return next(new ErrorHandeler("Update Faild.", 400));

    } catch (err) {
        next(err);
    }
});

export const getBus = catchError(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Items per page (default: 10)

        const total = await Bus.countDocuments(); // Total number of categories
        const bus = await Bus.find().skip((page - 1) * limit) // Skip items of previous pages
            .limit(limit); // Limit the number of items per page
        if (!bus) return next(new ErrorHandeler("Category Not Found.", 401));
        return res.status(200).json(response(true, "All Record Fetched", bus, total));
    } catch (err) {
        next(err);
    }
});

export const deleteBus = catchError(async (req, res, next) => {
    try {
        const _id = req.params._id;
        if (!_id) return next(new ErrorHandeler("Category Id is required.", 401));
        const deletedBus = await Bus.deleteOne({ _id });
        return res.status(200).json(response(true, "Bus Deleted Successfully."));
    } catch (err) {
        next(err);
    }
});