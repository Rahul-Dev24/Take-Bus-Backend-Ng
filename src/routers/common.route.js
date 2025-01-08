import express from "express";
import { imageUpload } from "../controllers/userHomePage.controller.js";

const commonRoute = express();

commonRoute.post("/upload/image", imageUpload);

export default commonRoute;