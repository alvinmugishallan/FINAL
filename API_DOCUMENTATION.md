# UCU Innovators Hub - API Documentation

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

---

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john.doe@ucu.ac.ug",
  "password": "SecurePassword123!",
  "role": "student",
  "faculty": "Engineering, Design and Technology",
  "department": "Computing & Technology"
}
\`\`\`

**Roles:** `student`, `supervisor`, `admin`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john.doe@ucu.ac.ug",
    "role": "student"
  },
  "token": "jwt-token-here"
}
\`\`\`

---

### POST /api/auth/login
Authenticate and receive JWT token.

**Request Body:**
\`\`\`json
{
  "email": "john.doe@ucu.ac.ug",
  "password": "SecurePassword123!"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john.doe@ucu.ac.ug",
    "role": "student"
  },
  "token": "jwt-token-here"
}
\`\`\`

---

## Project Endpoints

### GET /api/projects
Get all approved projects (public) or filtered projects.

**Query Parameters:**
- `faculty` (string): Filter by faculty
- `department` (string): Filter by department
- `category` (string): Filter by category
- `year` (number): Filter by year
- `technology` (string): Filter by technology
- `search` (string): Search in title and description
- `status` (string): Filter by status (requires auth)

**Response (200):**
\`\`\`json
{
  "success": true,
  "projects": [
    {
      "id": "project-id",
      "title": "AI-Powered Student Portal",
      "description": "An intelligent portal for UCU students",
      "category": "Web Application",
      "faculty": "Engineering, Design and Technology",
      "department": "Computing & Technology",
      "technologies": ["React", "Node.js", "PostgreSQL"],
      "githubUrl": "https://github.com/user/repo",
      "liveUrl": "https://demo.example.com",
      "year": 2025,
      "status": "approved",
      "author": {
        "name": "John Doe",
        "email": "john.doe@ucu.ac.ug"
      },
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
\`\`\`

---

### POST /api/projects
Submit a new project (requires student/supervisor authentication).

**Request Body (multipart/form-data):**
\`\`\`json
{
  "title": "AI-Powered Student Portal",
  "description": "An intelligent portal for UCU students with AI-driven features",
  "category": "Web Application",
  "faculty": "Engineering, Design and Technology",
  "department": "Computing & Technology",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "githubUrl": "https://github.com/user/repo",
  "liveUrl": "https://demo.example.com",
  "year": 2025,
  "teamMembers": ["John Doe", "Jane Smith"],
  "document": "file-upload.pdf"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Project submitted successfully",
  "project": {
    "id": "project-id",
    "title": "AI-Powered Student Portal",
    "status": "pending"
  }
}
\`\`\`

---

### GET /api/projects/[id]
Get project details by ID.

**Response (200):**
\`\`\`json
{
  "success": true,
  "project": {
    "id": "project-id",
    "title": "AI-Powered Student Portal",
    "description": "Detailed description...",
    "category": "Web Application",
    "faculty": "Engineering, Design and Technology",
    "department": "Computing & Technology",
    "technologies": ["React", "Node.js", "PostgreSQL"],
    "githubUrl": "https://github.com/user/repo",
    "liveUrl": "https://demo.example.com",
    "documentUrl": "/uploads/document.pdf",
    "year": 2025,
    "status": "approved",
    "teamMembers": ["John Doe", "Jane Smith"],
    "author": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john.doe@ucu.ac.ug"
    },
    "comments": [
      {
        "id": "comment-id",
        "content": "Great project!",
        "user": {
          "name": "Supervisor Name"
        },
        "createdAt": "2025-01-16T09:00:00Z"
      }
    ],
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-16T09:00:00Z"
  }
}
\`\`\`

---

### PUT /api/projects/[id]
Update project (requires author or admin authentication).

**Request Body:**
\`\`\`json
{
  "title": "Updated Title",
  "description": "Updated description",
  "liveUrl": "https://new-demo.example.com"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Project updated successfully",
  "project": {
    "id": "project-id",
    "title": "Updated Title"
  }
}
\`\`\`

---

### DELETE /api/projects/[id]
Delete project (requires author or admin authentication).

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Project deleted successfully"
}
\`\`\`

---

## Approval Endpoints

### POST /api/projects/[id]/approve
Approve a project (requires supervisor/admin authentication).

**Request Body:**
\`\`\`json
{
  "comment": "Great work! Approved for publication."
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Project approved successfully",
  "project": {
    "id": "project-id",
    "status": "approved"
  }
}
\`\`\`

---

### POST /api/projects/[id]/reject
Reject a project (requires supervisor/admin authentication).

**Request Body:**
\`\`\`json
{
  "comment": "Please improve the documentation and resubmit.",
  "reason": "Insufficient documentation"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Project rejected",
  "project": {
    "id": "project-id",
    "status": "rejected"
  }
}
\`\`\`

---

## Comment Endpoints

### POST /api/projects/[id]/comments
Add a comment to a project (requires authentication).

**Request Body:**
\`\`\`json
{
  "content": "This is an excellent implementation of the feature!"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Comment added successfully",
  "comment": {
    "id": "comment-id",
    "content": "This is an excellent implementation of the feature!",
    "user": {
      "name": "John Doe"
    },
    "createdAt": "2025-01-16T10:00:00Z"
  }
}
\`\`\`

---

## Analytics Endpoints

### GET /api/analytics
Get analytics data (requires admin authentication).

**Response (200):**
\`\`\`json
{
  "success": true,
  "analytics": {
    "totalProjects": 150,
    "approvedProjects": 120,
    "pendingProjects": 20,
    "rejectedProjects": 10,
    "totalUsers": 500,
    "projectsByFaculty": [
      {
        "faculty": "Engineering, Design and Technology",
        "count": 80
      },
      {
        "faculty": "Business & Administration",
        "count": 40
      }
    ],
    "projectsByCategory": [
      {
        "category": "Web Application",
        "count": 60
      },
      {
        "category": "Mobile App",
        "count": 40
      }
    ],
    "projectsByYear": [
      {
        "year": 2025,
        "count": 50
      },
      {
        "year": 2024,
        "count": 100
      }
    ],
    "trendingTechnologies": [
      {
        "technology": "React",
        "count": 80
      },
      {
        "technology": "Node.js",
        "count": 70
      }
    ],
    "topInnovators": [
      {
        "name": "John Doe",
        "projectCount": 5
      }
    ],
    "approvalRate": 80,
    "recentActivity": [
      {
        "type": "project_submitted",
        "project": "AI Portal",
        "user": "John Doe",
        "timestamp": "2025-01-16T10:00:00Z"
      }
    ]
  }
}
\`\`\`

---

## Error Responses

All endpoints may return error responses with appropriate HTTP status codes:

**400 Bad Request:**
\`\`\`json
{
  "success": false,
  "error": "Validation error message"
}
\`\`\`

**401 Unauthorized:**
\`\`\`json
{
  "success": false,
  "error": "Authentication required"
}
\`\`\`

**403 Forbidden:**
\`\`\`json
{
  "success": false,
  "error": "Insufficient permissions"
}
\`\`\`

**404 Not Found:**
\`\`\`json
{
  "success": false,
  "error": "Resource not found"
}
\`\`\`

**500 Internal Server Error:**
\`\`\`json
{
  "success": false,
  "error": "An unexpected error occurred"
}
\`\`\`

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Public endpoints:** 100 requests per 15 minutes
- **Authenticated endpoints:** 1000 requests per 15 minutes

---

## Best Practices

1. Always include the `Authorization` header for protected routes
2. Handle errors gracefully in your client application
3. Use query parameters for filtering and pagination
4. Validate all user input before submission
5. Store JWT tokens securely (not in localStorage for production)
6. Implement proper CORS policies for production deployments
