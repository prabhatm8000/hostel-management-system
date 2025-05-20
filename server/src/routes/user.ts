import express from "express";
import { createUser, loginUser, verify } from "../controllers/user";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/login", loginUser);
router.get("/verify", auth.auth, verify);

// Create admin user manually (disable this after first run)
router.post("/create", createUser);

export default router;
