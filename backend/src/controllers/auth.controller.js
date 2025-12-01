import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import User from "../models/User.model.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { email, password, firstName, lastName, role, faculty, department, studentId } = req.body

    const userExists = mockUsers.find(user => user.email === email)
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      _id: (mockUsers.length + 1).toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      faculty,
      department,
      studentId,
      isActive: true,
    }
    mockUsers.push(newUser)

    const token = generateToken(newUser._id)

    res.status(201).json({
      success: true,
      data: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        faculty: newUser.faculty,
        token,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { email, password } = req.body

    const user = mockUsers.find(user => user.email === email)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      })
    }

    const token = generateToken(user._id)

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        faculty: user.faculty,
        token,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = mockUsers.find(user => user._id === req.user.id)

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
