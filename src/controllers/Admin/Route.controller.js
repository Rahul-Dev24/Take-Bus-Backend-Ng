import { catchError, ErrorHandeler } from "../../middlewares/Error.middleware.js";
import Route from "../../models/route.model.js";
import { response } from "../../utils/responseFormate.js";


export const getRoute = catchError(async (req, res, next) => {
    try {
        const query = req.query.IP;

        const routes = await Route.find();
        if (!routes) return next(new ErrorHandeler("Fetch Failed.", 400));
        return res.status(200).json(response(true, "Get All route", routes));
    } catch (err) {
        next(err);
    }
});

export const searchRoute = catchError(async (req, res, next) => {

    try {
        const query = req.params.query;
        const count = 10;
        const regex = new RegExp(query, "i");
        const data = await Route.find({
            $or: [{ city: { $regex: regex } }, { country: { $regex: regex } }]
        }).limit(count);
        res.status(200).json(response(true, "Search Route.", data));
    } catch (err) {
        next(err)
    }
});