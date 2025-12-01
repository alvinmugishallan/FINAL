import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { validateProjectSubmission, sanitizeInput } from "@/lib/validation"

// Mock database for projects
const mockProjects: any[] = [
  {
    id: 1,
    title: "Smart Agriculture Monitoring System",
    description: "IoT-based solution for real-time crop monitoring and automated irrigation control.",
    faculty: "Engineering",
    department: "Computer Science",
    technologies: ["React", "Node.js", "IoT", "MongoDB"],
    year: 2024,
    status: "approved",
    submittedBy: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Mobile Health Records Platform",
    description: "Secure digital health records management system for rural healthcare facilities.",
    faculty: "Health Sciences",
    department: "Health Informatics",
    technologies: ["React Native", "Firebase", "Express"],
    year: 2024,
    status: "approved",
    submittedBy: 2,
    createdAt: new Date(),
  },
]
let nextProjectId = 3

// GET - List all projects (public or filtered)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const faculty = searchParams.get("faculty")
    const year = searchParams.get("year")
    const search = searchParams.get("search")

    let filteredProjects = [...mockProjects]

    // Filter by status (default to approved for public)
    if (status) {
      filteredProjects = filteredProjects.filter((p) => p.status === status)
    } else {
      filteredProjects = filteredProjects.filter((p) => p.status === "approved")
    }

    // Filter by faculty
    if (faculty && faculty !== "All Faculties") {
      filteredProjects = filteredProjects.filter((p) => p.faculty === faculty)
    }

    // Filter by year
    if (year && year !== "All Years") {
      filteredProjects = filteredProjects.filter((p) => p.year === Number.parseInt(year))
    }

    // Search filter
    if (search) {
      const query = search.toLowerCase()
      filteredProjects = filteredProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies?.some((tech: string) => tech.toLowerCase().includes(query)),
      )
    }

    return NextResponse.json({ projects: filteredProjects })
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Submit new project (authenticated)
export async function POST(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Sanitize inputs
    const sanitizedData = {
      title: sanitizeInput(body.title),
      description: sanitizeInput(body.description),
      category: body.category ? sanitizeInput(body.category) : undefined,
      faculty: sanitizeInput(body.faculty),
      department: sanitizeInput(body.department),
      year: body.year,
      technologies: body.technologies,
      githubLink: body.githubLink,
      liveDemoLink: body.liveDemoLink,
      documentUrl: body.documentUrl,
      teamMembers: body.teamMembers,
    }

    // Validate
    const validation = validateProjectSubmission(sanitizedData)
    if (!validation.valid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Create project
    const project = {
      id: nextProjectId++,
      ...sanitizedData,
      status: "pending",
      submittedBy: payload.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockProjects.push(project)

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
