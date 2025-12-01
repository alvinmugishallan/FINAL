import express from "express"
import { body } from "express-validator"
import { register, login, getMe } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("firstName").trim().notEmpty(),
    body("lastName").trim().notEmpty(),
    body("role").isIn(["student", "supervisor", "admin"]),
  ],
  register,
)

router.post("/login", [body("email").isEmail().normalizeEmail(), body("password").notEmpty()], login)

router.get("/me", protect, getMe)

export default router
