import dotenv from "dotenv"
import { connectDB } from "../config/database.js"
import User from "../models/User.model.js"
import Project from "../models/Project.model.js"
import Comment from "../models/Comment.model.js"

dotenv.config()

const seedDatabase = async () => {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany()
    await Project.deleteMany()
    await Comment.deleteMany()

    console.log("📦 Creating users...")

    // Create admin
    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@ucu.ac.ug",
      password: "admin123",
      role: "admin",
      faculty: "Engineering",
      department: "Computing & Technology",
    })

    // Create supervisor
    const supervisor = await User.create({
      firstName: "Dr. John",
      lastName: "Doe",
      email: "supervisor@ucu.ac.ug",
      password: "supervisor123",
      role: "supervisor",
      faculty: "Engineering",
      department: "Computing & Technology",
    })

    // Create students
    const students = await User.create([
      {
        firstName: "Alice",
        lastName: "Nakato",
        email: "alice@ucu.ac.ug",
        password: "student123",
        role: "student",
        faculty: "Engineering",
        department: "Computing & Technology",
        studentId: "UCU2021001",
      },
      {
        firstName: "Bob",
        lastName: "Okello",
        email: "bob@ucu.ac.ug",
        password: "student123",
        role: "student",
        faculty: "Business",
        department: "Business Administration",
        studentId: "UCU2021002",
      },
      {
        firstName: "Catherine",
        lastName: "Nambi",
        email: "catherine@ucu.ac.ug",
        password: "student123",
        role: "student",
        faculty: "Sciences",
        department: "Computer Science",
        studentId: "UCU2021003",
      },
    ])

    console.log("✅ Users created")
    console.log("📦 Creating projects...")

    // Create projects
    await Project.create([
      {
        title: "Smart Agriculture Monitoring System",
        description:
          "IoT-based system for monitoring soil moisture, temperature, and crop health in real-time using sensors and mobile app.",
        category: "IoT",
        faculty: "Engineering",
        department: "Computing & Technology",
        technologies: ["Arduino", "React Native", "Firebase", "Node.js"],
        githubLink: "https://github.com/example/smart-agri",
        liveDemoLink: "https://smart-agri-demo.com",
        teamMembers: [
          { name: "Alice Nakato", role: "Lead Developer", email: "alice@ucu.ac.ug" },
          { name: "Peter Musoke", role: "Hardware Engineer", email: "peter@ucu.ac.ug" },
        ],
        submittedBy: students[0]._id,
        supervisor: supervisor._id,
        status: "approved",
        academicYear: "2024/2025",
      },
      {
        title: "UCU Carpooling Platform",
        description:
          "Web and mobile platform connecting UCU students and staff for safe, affordable carpooling within Mukono and Kampala.",
        category: "Web Development",
        faculty: "Business",
        department: "Business Administration",
        technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
        githubLink: "https://github.com/example/ucu-carpool",
        teamMembers: [{ name: "Bob Okello", role: "Full Stack Developer", email: "bob@ucu.ac.ug" }],
        submittedBy: students[1]._id,
        status: "pending",
        academicYear: "2024/2025",
      },
      {
        title: "AI-Powered Student Performance Predictor",
        description:
          "Machine learning model that predicts student academic performance based on attendance, assignments, and engagement metrics.",
        category: "AI/ML",
        faculty: "Sciences",
        department: "Computer Science",
        technologies: ["Python", "TensorFlow", "Pandas", "Flask", "React"],
        githubLink: "https://github.com/example/performance-predictor",
        teamMembers: [
          { name: "Catherine Nambi", role: "Data Scientist", email: "catherine@ucu.ac.ug" },
          { name: "David Ssemakula", role: "Backend Developer", email: "david@ucu.ac.ug" },
        ],
        submittedBy: students[2]._id,
        supervisor: supervisor._id,
        status: "approved",
        academicYear: "2024/2025",
      },
    ])

    console.log("✅ Projects created")
    console.log("")
    console.log("🎉 Database seeded successfully!")
    console.log("")
    console.log("📝 Test Credentials:")
    console.log("-------------------")
    console.log("Admin:")
    console.log("  Email: admin@ucu.ac.ug")
    console.log("  Password: admin123")
    console.log("")
    console.log("Supervisor:")
    console.log("  Email: supervisor@ucu.ac.ug")
    console.log("  Password: supervisor123")
    console.log("")
    console.log("Student:")
    console.log("  Email: alice@ucu.ac.ug")
    console.log("  Password: student123")
    console.log("")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
