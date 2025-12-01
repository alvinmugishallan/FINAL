import express from "express"
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateProjectStatus,
  getMyProjects,
} from "../controllers/project.controller.js"
import { protect, authorize } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/upload.middleware.js"

const router = express.Router()

router.route("/").get(getAllProjects).post(protect, authorize("student"), upload.single("document"), createProject)

router.get("/my-projects", protect, getMyProjects)

router.route("/:id").get(getProjectById).put(protect, updateProject).delete(protect, deleteProject)

router.patch("/:id/status", protect, authorize("supervisor", "admin"), updateProjectStatus)

export default router
