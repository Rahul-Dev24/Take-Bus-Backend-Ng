import express from "express"
import { getCategory, addCategory, editCategory, deleteCategory } from "../../controllers/Admin/Category.controller.js";

const categoryRoutes = express();

categoryRoutes.get("/getCategory", getCategory);
categoryRoutes.post("/createCategory", addCategory);
categoryRoutes.put("/updateCategory", editCategory);
categoryRoutes.delete("/deleteCategory", deleteCategory);

export default categoryRoutes;