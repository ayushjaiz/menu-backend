import express from "express";
import { createSubcategory, editSubcategory, getAllSubcategories, getSubcategory } from "../controllers/subcategory.controller";
import { createSubcategoryValidator } from "../utils/validators/create-subcategory-validator";
import { validate } from "../utils/validate";
import { editSubcategoryValidator } from "../utils/validators/edit-subactegory-validator";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/create", authenticate, validate(createSubcategoryValidator), createSubcategory);
router.patch("/edit/:id", authenticate, validate(editSubcategoryValidator), editSubcategory);

router.get("/", getAllSubcategories);
router.get("/:identifier", getSubcategory);

export default router;
