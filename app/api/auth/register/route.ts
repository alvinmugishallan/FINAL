import { NextResponse } from "next/server"
import { hashPassword, generateToken } from "@/lib/auth"

// Mock database - in production, use real database
const mockUsers: any[] = []
let nextUserId = 1

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, role, faculty, department } = body

    // Validation
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = {
      id: nextUserId++,
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      faculty,
      department,
      createdAt: new Date(),
    }

    mockUsers.push(user)

    // Generate token
    const token = await generateToken(user.id, user.email, user.role)

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
