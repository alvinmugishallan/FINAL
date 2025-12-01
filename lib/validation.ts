// Input validation utilities

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters long" }
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: "Password must contain at least one uppercase letter" }
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, error: "Password must contain at least one lowercase letter" }
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, error: "Password must contain at least one number" }
  }

  return { valid: true }
}

export function validateProjectSubmission(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.title || data.title.trim().length < 5) {
    errors.push("Title must be at least 5 characters long")
  }

  if (!data.description || data.description.trim().length < 20) {
    errors.push("Description must be at least 20 characters long")
  }

  if (!data.faculty || data.faculty === "") {
    errors.push("Faculty is required")
  }

  if (!data.department || data.department.trim() === "") {
    errors.push("Department is required")
  }

  if (!data.year || data.year < 2000 || data.year > new Date().getFullYear() + 1) {
    errors.push("Invalid year")
  }

  if (!data.technologies || data.technologies.length === 0) {
    errors.push("At least one technology is required")
  }

  if (data.githubLink && !isValidUrl(data.githubLink)) {
    errors.push("Invalid GitHub URL")
  }

  if (data.liveDemoLink && !isValidUrl(data.liveDemoLink)) {
    errors.push("Invalid live demo URL")
  }

  if (data.documentUrl && !isValidUrl(data.documentUrl)) {
    errors.push("Invalid document URL")
  }

  return { valid: errors.length === 0, errors }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}
