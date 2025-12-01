import { NextResponse } from "next/server"

// Mock database - shared with projects route
const mockProjects: any[] = []

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const project = mockProjects.find((p) => p.id === projectId)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("[v0] Error fetching project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
