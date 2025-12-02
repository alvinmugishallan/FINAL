import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Login failed" },
        { status: response.status }
      )
    }

    return NextResponse.json({
      user: {
        id: data.data.id,
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        role: data.data.role,
        faculty: data.data.faculty,
      },
      token: data.data.token,
    })
  } catch (error) {
    console.error("Login proxy error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
