# UCU Innovators Hub - Backend API

Node.js/Express REST API with MongoDB for the UCU Innovators Hub platform.

## Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Student, Supervisor, and Admin roles
- **Project Management** - CRUD operations for innovation projects
- **File Upload** - Support for PDF document uploads
- **Analytics** - Comprehensive statistics and insights
- **Comments System** - Collaboration through project comments
- **Search & Filtering** - Advanced query capabilities

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Validation:** Express Validator
- **Security:** Helmet, CORS, bcrypt

## Installation

1. **Install dependencies:**
\`\`\`bash
cd backend
npm install
\`\`\`

2. **Configure environment variables:**
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

3. **Create uploads directory:**
\`\`\`bash
mkdir uploads
\`\`\`

4. **Start MongoDB:**
\`\`\`bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
\`\`\`

5. **Seed the database:**
\`\`\`bash
npm run seed
\`\`\`

6. **Start the server:**
\`\`\`bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `POST /api/projects` - Create project (student only)
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PATCH /api/projects/:id/status` - Update project status (supervisor/admin)
- `GET /api/projects/my-projects` - Get user's projects

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Analytics (Admin/Supervisor)
- `GET /api/analytics` - Get comprehensive analytics

### Comments
- `GET /api/comments/project/:projectId` - Get project comments
- `POST /api/comments/project/:projectId` - Create comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## Authentication

Include JWT token in request headers:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

## Sample .env Configuration

\`\`\`env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ucu-innovators-hub
JWT_SECRET=your-super-secret-key-min-32-characters
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
\`\`\`

## Database Schema

### Users
- firstName, lastName, email, password
- role: student | supervisor | admin
- faculty, department, studentId
- isActive, timestamps

### Projects
- title, description, category, faculty
- technologies[], teamMembers[]
- githubLink, liveDemoLink, documentUrl
- submittedBy (User ref), supervisor (User ref)
- status: pending | approved | rejected | under_review
- views, likes, academicYear, timestamps

### Comments
- project (Project ref), user (User ref)
- content, parentComment (Comment ref)
- timestamps

## Testing

Use the seeded test accounts:

**Admin:**
- Email: admin@ucu.ac.ug
- Password: admin123

**Supervisor:**
- Email: supervisor@ucu.ac.ug
- Password: supervisor123

**Student:**
- Email: alice@ucu.ac.ug
- Password: student123

## Error Handling

All errors return JSON in the format:
\`\`\`json
{
  "success": false,
  "message": "Error description"
}
\`\`\`

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Input validation and sanitization
- Helmet security headers
- CORS configuration
- Rate limiting ready
- File upload restrictions

## Development

\`\`\`bash
# Run with auto-reload
npm run dev

# Check for issues
npm run lint
\`\`\`

## Production Deployment

1. Set NODE_ENV=production
2. Use strong JWT_SECRET
3. Configure MongoDB Atlas
4. Set up file storage (AWS S3, etc.)
5. Enable HTTPS
6. Configure rate limiting
7. Set up logging and monitoring

## License

MIT - Uganda Christian University
