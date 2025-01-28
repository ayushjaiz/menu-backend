import express from "express";
import { createItem, editItem, getAllItems, getItem } from "../controllers/item.controller";
import { validate } from "../utils/validators/validate";
import { createItemValidator } from "../utils/validators/create-item-validator";

const router = express.Router();

router.post("/create", validate(createItemValidator), createItem);
router.patch("/:id", editItem);

router.get("/:identifier", getItem);
router.get("/", getAllItems);

export default router;
