import mongoose from "mongoose";


const driverSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "Partner id is required."]
    },
    profileImg: {
        type: String,
        default: null
    },
    licenceNo: {
        type: String,
        require: [true, "Driving licence is required."]
    },
    name: {
        type: String,
        require: [true, "Name is required."]
    },
    age: {
        type: Number,
        require: [true, "Age is required."]
    },
    salary: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;