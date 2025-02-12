import { mongoose } from "mongoose";

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    roomNo: {
        type: [{
            number: Number,
            unAvailableDates: {
                type: [Date],
            }
        }]
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    maxGuest: {
        type: Number,
        require: true
    },
    imgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        default: null
    },
    imgId: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        require: true
    }
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;