import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, "Partner id is required."]
    },
    brand: {
        type: String,
        require: [true, "Brand Name is Required."]
    },
    model: {
        type: String,
        require: [true, "Bus Model is Required."]
    },
    seatCapacity: {
        type: Number,
        require: [true, "Bus Capacity is Required."]
    },
    registrationNo: {
        type: String,
        require: [true, "Registration No is Required."]
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Bus = mongoose.model("Bus", busSchema);
export default Bus;