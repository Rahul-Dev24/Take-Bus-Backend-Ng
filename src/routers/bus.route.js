import express from "express";
import { auth } from "../middlewares/adminAuth.middleware.js";
import { createBus, deleteBus, getBus, updateBus, getBusById, getActiveBus } from "../controllers/Admin/Bus.controller.js";

const busRoutes = express.Router();

busRoutes.get("/getBus", getBus);

busRoutes.put("/updateBus/:_id", auth, updateBus);

busRoutes.post("/createBus", auth, createBus);

busRoutes.delete("/deleteBus/:_id", auth, deleteBus);

busRoutes.get("/getBusById/:_id", getBusById);

busRoutes.get("/getActiveBus", getActiveBus);

export default busRoutes

