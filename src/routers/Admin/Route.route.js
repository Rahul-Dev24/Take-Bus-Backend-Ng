import express from "express";
import { getRoute, searchRoute } from "../../controllers/Admin/Route.controller.js";

const routeRoute = express();

routeRoute.get("/getRoute/:IP", getRoute);
routeRoute.get("/getRoute", getRoute);
routeRoute.get("/searchRoute/:query", searchRoute);
routeRoute.get("/searchRoute", searchRoute);

export default routeRoute;