import express from "express"
import { getProjectComments, createComment, deleteComment } from "../controllers/comment.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/project/:projectId").get(getProjectComments).post(protect, createComment)

router.delete("/:id", protect, deleteComment)

export default router
