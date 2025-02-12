import { catchError, errorHandeler } from "../middlewares/Error.middleware.js";
import Trip from "../models/Trip.model.js";
import { response } from "../utils/responseFormate.js";


export const getTrips = catchError(async (req, res, next) => {
    try {
        const user = req?.user;
        const { startDate, price } = req.body;

        const page = parseInt(req.query.page) || 1; // Current page (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Items per page (default: 10)

        if (user?.role == "partner") {
            const total = await Trip.countDocuments({
                partnerId: user?._id
            });

            const trip = await Trip.find({
                partnerId: user?._id
            }).populate({ path: "partnerId", model: "Users" }).populate({ path: "busId", model: "Bus" }).skip((page - 1) * limit).limit(limit).exec();

            return res.status(200).json(response(true, "Trip Fetch Successfully", trip, total));

        } else if (user?.role == "admin") {
            const total = await Trip.countDocuments();

            const trip = await Trip.find().populate({ path: "partnerId", model: "Users" }).populate({ path: "busId", model: "Bus" }).skip((page - 1) * limit).limit(limit).exec();

            return res.status(200).json(response(true, "Trip Fetch Successfully", trip, total));
        }

        const total = await Trip.countDocuments({
            tripDate: { $gte: startDate },
            price: { $gte: price }
        });
        const trip = await Trip.find({
            tripDate: { $gte: startDate },
            price: { $gte: price }
        }).populate({ path: "partnerId", model: "Users" }).populate({ path: "busId", model: "Bus" }).skip((page - 1) * limit).limit(limit).exec();

        return res.status(200).json(response(true, "Trip Fetch Successfully", trip, total));

    } catch (error) {
        next(error);
    }
});

export const getTripById = catchError(async (req, res, next) => {
    try {
        const _id = req.params._id;
        if (!_id) return next(new errorHandeler("Trip Id Not Found.", 400));
        const trip = await Trip.findById(_id);
        return res?.status(200).json(response(true, "Trip Get By ID", trip));
    } catch (error) {
        next(error);
    }
})

export const createTrip = catchError(async (req, res, next) => {
    try {
        const partnerId = req?.user?._id;
        const { route, tripDate, driverId, busId, featues } = req.body;
        if (route?.length < 1 || !tripDate || !busId) return next(new ErrorHandeler("All fields are required.", 400));

        const trip = new Trip({
            partnerId,
            route,
            tripDate,
            busId,
            featues,
            driverId: driverId ? driverId : partnerId
        });

        const data = await trip.save();
        return res?.status(201).json(response(true, "Trip Created Successfully.", data));
    } catch (error) {
        next(error);
    }
});


export const updateTrip = catchError(async (req, res, next) => {
    try {
        const { route, tripDate, driverId, busId, status, featues } = req.body;
        if (route?.length < 1 || !tripDate || !busId) return next(new errorHandeler("All fields are required.", 400));
        const _id = req?.params._id;
        if (!_id) return next(new errorHandeler("Id is required.", 400));
        const partnerId = req?.user?._id;

        const updatedTrip = await Trip.updateOne({ _id }, {
            $set: {
                route,
                tripDate,
                busId,
                featues,
                status: status ? status : true,
                driverId: driverId ? driverId : partnerId
            }
        });

        return res?.status(200).json(response(true, "Trip Updated Successfully.", updatedTrip));
    } catch (error) {
        next(error);
    }
});

