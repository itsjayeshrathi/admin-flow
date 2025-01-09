import express from "express";
import { login, signUp } from "../services/user.service";

const router = express.Router();
router.post("/signup", signUp)
router.post("/login", login)
export default router;
