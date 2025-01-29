import mongoose from "mongoose";

const userHomePageSchema = new mongoose.Schema({
    banner: {
        text: {
            type: String,
        },
        subText: {
            type: String,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    },
    ads: {
        type: []
    },
    offers: {
        type: []
    },
    topRoutes: {
        top: {
            type: []
        },
        medium: {
            type: []
        },
        low: {
            type: []
        }
    },
    feedback: {
        type: []
    },
    crowcelImg: {
        type: []
    }

}, { timestamps: true });


const UserHomePage = mongoose.model("userHomePage", userHomePageSchema);
export default UserHomePage;