import express from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller";
// import { rateLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;

