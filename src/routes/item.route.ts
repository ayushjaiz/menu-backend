import express from "express";
import { createItem, editItem, getAllItems, getItem } from "../controllers/item.controller";
import { validate } from "../utils/validators/validate";
import { createItemValidator } from "../utils/validators/create-item-validator";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/create", authenticate, validate(createItemValidator), createItem);
router.patch("/:id", authenticate, editItem);

router.get("/:identifier", getItem);
router.get("/", getAllItems);

export default router;
