import express from "express";
import { createSubcategory, editSubcategory, getAllSubcategories, getSubcategory } from "../controllers/subcategory.controller";
import { createSubcategoryValidator } from "../utils/validators/create-subcategory-validator";
import { validate } from "../utils/validators/validate";
import { editSubcategoryValidator } from "../utils/validators/edit-subactegory-validator";

const router = express.Router();

router.post("/create", validate(createSubcategoryValidator), createSubcategory);
router.patch("/edit/:id", validate(editSubcategoryValidator), editSubcategory);

router.get("/", getAllSubcategories);
router.get("/:identifier", getSubcategory);

export default router;
