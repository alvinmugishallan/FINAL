import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Web Development", "Mobile App", "AI/ML", "IoT", "Data Science", "Cybersecurity", "Blockchain", "Other"],
    },
    faculty: {
      type: String,
      required: [true, "Faculty is required"],
      enum: ["Engineering", "Business", "Humanities", "Sciences", "Law", "Theology"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    githubLink: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\//, "Please provide a valid GitHub URL"],
    },
    liveDemoLink: {
      type: String,
      trim: true,
    },
    documentUrl: {
      type: String,
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    teamMembers: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String },
      },
    ],
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "under_review"],
      default: "pending",
    },
    reviewComment: {
      type: String,
      trim: true,
    },
    reviewedAt: {
      type: Date,
    },
    academicYear: {
      type: String,
      default: () => {
        const year = new Date().getFullYear()
        return `${year}/${year + 1}`
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search and filtering
projectSchema.index({ title: "text", description: "text" })
projectSchema.index({ status: 1, createdAt: -1 })
projectSchema.index({ faculty: 1, category: 1 })

export default mongoose.model("Project", projectSchema)
