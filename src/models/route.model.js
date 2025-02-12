import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    placeName: {
        type: String,
        require: true
    },
}, { timestamps: true });

const Route = mongoose.model("Route", routeSchema);
export default Route