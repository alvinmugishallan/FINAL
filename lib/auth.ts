import { SignJWT, jwtVerify } from "jose"

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function generateToken(userId: number, email: string, role: string): Promise<string> {
  const token = await new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET_KEY)

  return token
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as { userId: number; email: string; role: string }
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  // In a real application, use bcrypt or similar
  // This is a simplified version for the MVP
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}
