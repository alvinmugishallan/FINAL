export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: "student" | "supervisor" | "admin"
  faculty?: string
  department?: string
  createdAt: Date
}

export interface Project {
  id: number
  title: string
  description: string
  category?: string
  faculty: string
  department: string
  year: number
  technologies: string[]
  githubLink?: string
  liveDemoLink?: string
  documentUrl?: string
  status: "pending" | "approved" | "rejected"
  submittedBy: number
  reviewedBy?: number
  reviewComment?: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectMember {
  id: number
  projectId: number
  studentName: string
  studentId?: string
  role?: string
}

export interface ProjectComment {
  id: number
  projectId: number
  userId: number
  comment: string
  createdAt: Date
}

export interface AuthResponse {
  user: User
  token: string
}
