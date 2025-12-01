import express from "express"
import { getAnalytics } from "../controllers/analytics.controller.js"
import { protect, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", protect, authorize("admin", "supervisor"), getAnalytics)

export default router
