import express from "express";
import { partnerAuth } from "../middlewares/partner.middleware.js";
import { createTrip, getTrips, updateTrip, getTripById } from "../controllers/trip.controller.js";

const tripRoutes = express.Router();

tripRoutes.use(partnerAuth);

tripRoutes.get("/getTrip", getTrips);

tripRoutes.post("/createTrip", createTrip);

tripRoutes.put("/updateTrip/:_id", updateTrip);

tripRoutes.get("getTripById/:_id", getTripById);

export default tripRoutes;

