import express from "express"
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js"
import { protect, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(protect)
router.use(authorize("admin"))

router.route("/").get(getAllUsers)

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)

export default router
