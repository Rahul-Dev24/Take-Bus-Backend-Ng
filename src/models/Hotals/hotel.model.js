import { mongoose } from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    distance: {
        type: String,
        require: true
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
    },
    image: {
        type: String,
    },
    country: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    rating: {
        type: true,
        min: [0, "Rating must be between 0 and 5"],
        max: [5, "Rating must be between 0 and 5"],
        default: 0
    },
    rooms: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "room",
        require: true
    },
    cheapestPrice: {
        type: Number,
        require: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;