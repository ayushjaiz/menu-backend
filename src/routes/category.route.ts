import express from "express";
import { createCategory, editCategory, getAllCategories, getCategory, getItemsUnderCategory, getSubcategoriesUnderCategory } from "../controllers/category.controller";
import { createCategoryValidator } from "../utils/validators/create-category-validator";
import { validate } from "../utils/validate";
import { editCategoryValidator } from "../utils/validators/edit-category-validator";
import { authenticate } from "../middlewares/authenticate";
// import { rateLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post("/create", authenticate, validate(createCategoryValidator), createCategory);
router.patch("/edit/:id", authenticate, validate(editCategoryValidator), editCategory);

router.get("/:identifier", getCategory);
router.get("/", getAllCategories);

router.get("/:identifier/subcategory", getSubcategoriesUnderCategory)
router.get("/:identifier/item", getItemsUnderCategory)

export default router;
