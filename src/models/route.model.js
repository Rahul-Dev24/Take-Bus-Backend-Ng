import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    city: String,
    city_ascii: String,
    lat: Number,
    lng: Number,
    country: String,
    iso2: String,
    iso3: String,
    capital: String,
    population: Number

}, { timestamps: true });

const Route = mongoose.model("Route", routeSchema);
export default Route
