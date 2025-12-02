// Mock database - in production, use real database
export const mockUsers: any[] = []
let nextUserId = 1

export function getNextUserId() {
  return nextUserId++
}
