import Comment from "../models/Comment.model.js"

export const getProjectComments = async (req, res) => {
  try {
    const comments = await Comment.find({ project: req.params.projectId })
      .populate("user", "firstName lastName avatar")
      .populate("parentComment")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: comments,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      project: req.params.projectId,
      user: req.user.id,
      content: req.body.content,
      parentComment: req.body.parentComment || null,
    })

    await comment.populate("user", "firstName lastName avatar")

    res.status(201).json({
      success: true,
      data: comment,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      })
    }

    // Check ownership or admin
    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      })
    }

    await comment.deleteOne()

    res.json({
      success: true,
      message: "Comment deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
