import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        require: true
    },
    allowtmentNo: {
        type: String,
        require: true
    },
    route: {
        type: {
            source: String,
            destination: String
        },
    },
    status: {
        type: String,
        enum: ["waiting", "conform", "cancel"],
        require: true
    },
    totalAmount: {
        type: Number,
        require: true
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking