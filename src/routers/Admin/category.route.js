import express from "express"
import { getCategory, addCategory, editCategory, deleteCategory } from "../../controllers/Admin/Category.controller.js";

const categoryRoutes = express();

categoryRoutes.get("/getCategory/:status", getCategory);
categoryRoutes.post("/createCategory", addCategory);
categoryRoutes.put("/updateCategory/:_id", editCategory);
categoryRoutes.delete("/deleteCategory/:_id", deleteCategory);

export default categoryRoutes;
