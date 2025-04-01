import { catchError, ErrorHandeler } from "../../middlewares/Error.middleware.js";
import Route from "../../models/route.model.js";
import { response } from "../../utils/responseFormate.js";


export const getRoute = catchError(async (req, res, next) => {
    try {
        const query = req.params.IP;
        const page = parseInt(req.query.page) || 1; // Current page (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Items per page (default: 10)

        const total = await Route.countDocuments(); // Total number of categories

        const routes = await Route.find().skip((page - 1) * limit).limit(limit);
        if (!routes) return next(new ErrorHandeler("Fetch Failed.", 400));
        return res.status(200).json(response(true, "Get All route", routes, total));
    } catch (err) {
        next(err);
    }
});

export const searchRoute = catchError(async (req, res, next) => {
    try {
        const query = req.params.query;
        const count = 10;
        const regex = new RegExp(query, "i");
        if (query) {
            const data = await Route.find({
                $or: [{ city: { $regex: regex } }, { country: { $regex: regex } }]
            }).limit(count);
            return res.status(200).json(response(true, "Search Route.", data));
        }
        const data = await Route.find({ country: "India" }).limit(count);
        res.status(200).json(response(true, "Search Route.", data))
    } catch (err) {
        next(err)
    }
});