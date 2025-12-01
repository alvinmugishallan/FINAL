import Project from "../models/Project.model.js"
import User from "../models/User.model.js"

export const getAnalytics = async (req, res) => {
  try {
    // Total counts
    const totalProjects = await Project.countDocuments()
    const approvedProjects = await Project.countDocuments({ status: "approved" })
    const pendingProjects = await Project.countDocuments({ status: "pending" })
    const totalStudents = await User.countDocuments({ role: "student" })

    // Projects by faculty
    const projectsByFaculty = await Project.aggregate([
      { $group: { _id: "$faculty", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Projects by category
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Projects by status
    const projectsByStatus = await Project.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])

    // Projects by year
    const projectsByYear = await Project.aggregate([
      { $group: { _id: "$academicYear", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ])

    // Top technologies
    const topTechnologies = await Project.aggregate([
      { $unwind: "$technologies" },
      { $group: { _id: "$technologies", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ])

    // Top innovators
    const topInnovators = await Project.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$submittedBy", projectCount: { $sum: 1 } } },
      { $sort: { projectCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          name: { $concat: ["$user.firstName", " ", "$user.lastName"] },
          email: "$user.email",
          faculty: "$user.faculty",
          projectCount: 1,
        },
      },
    ])

    // Monthly trend (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyTrend = await Project.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    res.json({
      success: true,
      data: {
        overview: {
          totalProjects,
          approvedProjects,
          pendingProjects,
          totalStudents,
          approvalRate: totalProjects > 0 ? ((approvedProjects / totalProjects) * 100).toFixed(1) : 0,
        },
        projectsByFaculty,
        projectsByCategory,
        projectsByStatus,
        projectsByYear,
        topTechnologies,
        topInnovators,
        monthlyTrend,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
