import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

// Mock data for analytics
export async function GET(request: Request) {
  try {
    // Verify admin access
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = await verifyToken(token)

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    // Generate analytics data
    const analytics = {
      overview: {
        totalProjects: 156,
        pendingReview: 12,
        approvedProjects: 138,
        rejectedProjects: 6,
        totalStudents: 487,
        totalSupervisors: 42,
      },
      projectsByFaculty: [
        { faculty: "Engineering", count: 68, percentage: 43.6 },
        { faculty: "Health Sciences", count: 32, percentage: 20.5 },
        { faculty: "Business", count: 28, percentage: 17.9 },
        { faculty: "Education", count: 18, percentage: 11.5 },
        { faculty: "Law", count: 7, percentage: 4.5 },
        { faculty: "Theology", count: 3, percentage: 1.9 },
      ],
      projectsByYear: [
        { year: 2020, count: 18 },
        { year: 2021, count: 32 },
        { year: 2022, count: 45 },
        { year: 2023, count: 38 },
        { year: 2024, count: 23 },
      ],
      trendingTechnologies: [
        { name: "React", count: 82, trend: 15 },
        { name: "Node.js", count: 76, trend: 12 },
        { name: "Python", count: 54, trend: -3 },
        { name: "MongoDB", count: 48, trend: 8 },
        { name: "Firebase", count: 42, trend: 22 },
        { name: "PostgreSQL", count: 38, trend: 5 },
        { name: "React Native", count: 35, trend: 18 },
        { name: "Django", count: 28, trend: -5 },
      ],
      approvalRates: [
        { month: "Jan", approved: 12, rejected: 1, pending: 3 },
        { month: "Feb", approved: 15, rejected: 2, pending: 2 },
        { month: "Mar", approved: 18, rejected: 0, pending: 4 },
        { month: "Apr", approved: 14, rejected: 1, pending: 2 },
        { month: "May", approved: 16, rejected: 1, pending: 3 },
        { month: "Jun", approved: 13, rejected: 1, pending: 2 },
      ],
      topInnovators: [
        { name: "John Doe", projects: 5, faculty: "Engineering" },
        { name: "Jane Smith", projects: 4, faculty: "Health Sciences" },
        { name: "Alice Johnson", projects: 4, faculty: "Engineering" },
        { name: "Bob Wilson", projects: 3, faculty: "Business" },
        { name: "Carol Brown", projects: 3, faculty: "Education" },
      ],
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("[v0] Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
