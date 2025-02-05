import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    imgage: {
        type: String,
        default: null
    },
    imgId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Image",
        default: null
    },
    status: {
        type: Boolean,
        require: true
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categoryModel);

export default Category;
