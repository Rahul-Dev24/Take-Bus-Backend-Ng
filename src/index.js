import express from "express";
import { DBConnection } from "./utils/DBConnection.js";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorHandeler } from "./middlewares/Error.middleware.js";
import authRoutes from "./routers/auth.route.js";
import commonRoute from "./routers/common.route.js";

const app = express();

config();

DBConnection();

// app.use(cors({
//     origin: "*",
//     methods: ["PORT", "GET", "PUT", "DELETE"],
//     credentials: true
// }));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT} port`);
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", commonRoute)

app.get("/demo", (req, res, next) => {
    res.status(200).json({
        "message": "Demo"
    })
})



app.use(errorHandeler);