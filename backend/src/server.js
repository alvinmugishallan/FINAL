import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"
import { errorHandler } from "./middleware/error.middleware.js"

// Import routes
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
import userRoutes from "./routes/user.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import commentRoutes from "./routes/comment.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files (uploaded documents)
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/users", userRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/comments", commentRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "UCU Innovators Hub API is running",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV}`)
})
