import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "Partner id is required."]
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        require: [true, "Bus id is required."]
    },
    source: String,
    destination: String,
    route: {
        type: [{
            stop:{
                 type: mongoose.Schema.Types.ObjectId,
                    ref: "route",
            },
            startTime: {
                type: Date,
                require: [true, "Start Time is required."],
            },
            endTime: {
                type: Date,
                require: [true, "End Time is required."],
            },
            price: {
                type: Number,
                require: [true, "Price is required."],
            }
        }]
    },
    featues: {
        type: [String],
    },
    status: {
        type: Boolean,
        default: true
    },
    tripDate: {
        type: Date,
        require: [true, "Trip Date is required."]
    },
    endDate: {
        type: Date,
        require: [true, "Trip Date is required."]
    },
    driverId: {
        type: String,
    }
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
