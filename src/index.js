import express from "express";
import { DBConnection } from "./utils/DBConnection.js";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorHandeler } from "./middlewares/Error.middleware.js";
import authRoutes from "./routers/auth.route.js";
import commonRoute from "./routers/common.route.js";
import userRoute from "./routers/user.route.js";
import categoryRoutes from "./routers/Admin/category.route.js"
import busRoutes from "./routers/bus.route.js";
import tripRoutes from "./routers/trip.route.js";
const app = express();

config();

DBConnection();

app.use(cors({
    origin: "*",
    methods: ["PORT", "GET", "PUT", "DELETE"],
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", authRoutes);
app.use("/api/v1", commonRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1/admin", categoryRoutes);
app.use("/api/v1/bus", busRoutes);
app.use("/api/v1/trip", tripRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT} port`);
});



app.use(errorHandeler);