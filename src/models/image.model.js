import mongoose from "mongoose";

// Define the schema for the asset object
const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    asset_id: { type: String, required: true, unique: true },
    public_id: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    version_id: { type: String, required: true },
    signature: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    format: { type: String, required: true },
    resource_type: { type: String, required: true },
    created_at: { type: Date, required: true },
    tags: { type: [String], default: [] },
    bytes: { type: Number, required: true },
    type: { type: String, required: true },
    etag: { type: String, required: true },
    placeholder: { type: Boolean, required: true },
    url: { type: String, required: true },
    secure_url: { type: String, required: true },
    asset_folder: { type: String, default: '' },
    display_name: { type: String, required: true },
    original_filename: { type: String, required: true }
});

// Create a model from the schema
const ImageModel = mongoose.model('Image', imageSchema);

// Export the model
export default ImageModel;
