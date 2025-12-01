import Project from "../models/Project.model.js"

export const createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      submittedBy: req.user.id,
    }

    if (req.body.teamMembers) {
      projectData.teamMembers = JSON.parse(req.body.teamMembers)
    }

    if (req.body.technologies) {
      projectData.technologies = JSON.parse(req.body.technologies)
    }

    if (req.file) {
      projectData.documentUrl = `/uploads/${req.file.filename}`
    }

    const project = await Project.create(projectData)
    await project.populate("submittedBy", "firstName lastName email")

    res.status(201).json({
      success: true,
      data: project,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getAllProjects = async (req, res) => {
  try {
    const { status, faculty, category, search, year, page = 1, limit = 12 } = req.query

    const query = {}

    // Only show approved projects to public users
    if (!req.user || req.user.role === "student") {
      query.status = "approved"
    } else if (status) {
      query.status = status
    }

    if (faculty) query.faculty = faculty
    if (category) query.category = category
    if (year) query.academicYear = year
    if (search) {
      query.$text = { $search: search }
    }

    const projects = await Project.find(query)
      .populate("submittedBy", "firstName lastName email faculty")
      .populate("supervisor", "firstName lastName email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const count = await Project.countDocuments(query)

    res.json({
      success: true,
      data: projects,
      pagination: {
        total: count,
        page: Number.parseInt(page),
        pages: Math.ceil(count / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("submittedBy", "firstName lastName email faculty department")
      .populate("supervisor", "firstName lastName email")

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    // Increment views
    project.views += 1
    await project.save()

    res.json({
      success: true,
      data: project,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ submittedBy: req.user.id })
      .populate("supervisor", "firstName lastName email")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    // Check ownership
    if (project.submittedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this project",
      })
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.json({
      success: true,
      data: project,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    // Check ownership
    if (project.submittedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this project",
      })
    }

    await project.deleteOne()

    res.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProjectStatus = async (req, res) => {
  try {
    const { status, reviewComment } = req.body

    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    project.status = status
    project.reviewComment = reviewComment
    project.reviewedAt = Date.now()
    project.supervisor = req.user.id

    await project.save()

    res.json({
      success: true,
      data: project,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
