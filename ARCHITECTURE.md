# System Architecture Documentation

## Overview

UCU Innovators Hub is built as a modern full-stack web application using Next.js 16, leveraging both server-side and client-side rendering for optimal performance and user experience.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │   Public   │  │  Student   │  │ Supervisor │  │   Admin   │ │
│  │   Pages    │  │ Dashboard  │  │ Dashboard  │  │ Dashboard │ │
│  └────────────┘  └────────────┘  └────────────┘  └───────────┘ │
│         │                │                │              │        │
│         └────────────────┴────────────────┴──────────────┘        │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Next.js App Router                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    API Routes                             │   │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐ │   │
│  │  │  Auth   │  │ Projects │  │ Analytics │  │  Users   │ │   │
│  │  │  API    │  │   API    │  │    API    │  │   API    │ │   │
│  │  └─────────┘  └──────────┘  └───────────┘  └──────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐   │
│  │     Auth     │  │  Validation  │  │   Authorization     │   │
│  │   Service    │  │   Service    │  │     Service         │   │
│  └──────────────┘  └──────────────┘  └─────────────────────┘   │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Data Layer                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  PostgreSQL / MySQL                       │   │
│  │  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌────────────┐  │   │
│  │  │ Users  │  │Projects │  │ Comments │  │  Members   │  │   │
│  │  └────────┘  └─────────┘  └──────────┘  └────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Component Architecture

### Frontend Components

\`\`\`
components/
├── ui/                      # Reusable UI primitives (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── header.tsx              # Global navigation
├── footer.tsx              # Site footer
└── charts/                 # Data visualization components
\`\`\`

### Page Structure

\`\`\`
app/
├── (public)/               # Public-facing pages
│   ├── page.tsx           # Landing page
│   ├── projects/          # Project gallery
│   └── about/             # About page
├── auth/                   # Authentication flows
│   ├── login/
│   └── register/
└── dashboard/              # Protected dashboards
    ├── student/           # Student workspace
    ├── supervisor/        # Review interface
    └── admin/             # Analytics & management
\`\`\`

## Data Flow

### Authentication Flow
\`\`\`
1. User submits credentials → 2. API validates → 3. JWT generated
   ↓
4. Token stored in localStorage → 5. Token sent with requests
   ↓
6. Middleware verifies token → 7. Access granted/denied
\`\`\`

### Project Submission Flow
\`\`\`
1. Student fills form → 2. Client validation
   ↓
3. POST /api/projects with JWT → 4. Server validation
   ↓
5. Sanitize inputs → 6. Save to database
   ↓
7. Return success → 8. Update UI
   ↓
9. Supervisor notified → 10. Review workflow begins
\`\`\`

## Entity Relationship Diagram

\`\`\`
┌─────────────┐          ┌──────────────┐          ┌─────────────┐
│    Users    │          │   Projects   │          │  Comments   │
├─────────────┤          ├──────────────┤          ├─────────────┤
│ id (PK)     │──────┐   │ id (PK)      │──────┐   │ id (PK)     │
│ email       │      │   │ title        │      │   │ project_id  │
│ password    │      └──<│ submitted_by │      └──<│ user_id     │
│ first_name  │          │ reviewed_by  │>─────┘   │ comment     │
│ last_name   │          │ faculty      │          │ created_at  │
│ role        │          │ department   │          └─────────────┘
│ faculty     │          │ year         │
│ created_at  │          │ status       │
└─────────────┘          │ description  │          ┌─────────────┐
                         │ technologies │          │   Members   │
                         │ github_link  │          ├─────────────┤
                         │ created_at   │          │ id (PK)     │
                         └──────────────┘          │ project_id  │
                                │                  │ student_name│
                                └─────────────────<│ role        │
                                                   └─────────────┘

Relationships:
- Users (1) ──< (Many) Projects [submitted_by]
- Users (1) ──< (Many) Projects [reviewed_by]
- Projects (1) ──< (Many) Comments
- Users (1) ──< (Many) Comments
- Projects (1) ──< (Many) Members
\`\`\`

## Security Architecture

### Authentication & Authorization

1. **JWT-based Authentication**
   - Tokens signed with HS256 algorithm
   - 7-day expiration
   - Payload includes: userId, email, role

2. **Role-Based Access Control**
   - Student: Submit and manage own projects
   - Supervisor: Review and approve projects
   - Admin: Full system access

3. **API Security**
   - Authorization header validation
   - Token verification on protected routes
   - Role-based endpoint access

### Data Security

1. **Input Validation**
   - Server-side validation for all inputs
   - Type checking and format validation
   - Length and content restrictions

2. **Input Sanitization**
   - XSS prevention
   - SQL injection prevention
   - HTML entity encoding

3. **Security Headers**
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin

## Performance Considerations

### Optimization Strategies

1. **Server-Side Rendering (SSR)**
   - Public pages pre-rendered for SEO
   - Faster initial page load

2. **Client-Side Navigation**
   - Next.js Link for instant transitions
   - Prefetching for improved UX

3. **Data Fetching**
   - Parallel data fetching where possible
   - Caching strategies for static data

4. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports for heavy components

## Scalability

### Horizontal Scaling
- Stateless API design
- JWT tokens (no session storage)
- Database connection pooling

### Vertical Scaling
- Optimized database queries
- Indexed columns for fast lookups
- Pagination for large datasets

## Monitoring & Logging

### Application Logging
- Error logging with context
- API request/response logging
- Authentication events

### Performance Monitoring
- Response time tracking
- Database query performance
- Client-side performance metrics

## Deployment Architecture

### Production Environment
\`\`\`
[Load Balancer]
     │
     ├──> [Next.js Server 1]
     ├──> [Next.js Server 2]
     └──> [Next.js Server 3]
            │
            ▼
      [Database Cluster]
       (Primary + Replicas)
\`\`\`

### Environment Variables
- `JWT_SECRET` - Token signing key
- `DATABASE_URL` - Database connection string
- `NEXT_PUBLIC_APP_URL` - Application URL

## Future Enhancements

1. **Real-time Features**
   - WebSocket for live notifications
   - Real-time collaboration

2. **File Storage**
   - Cloud storage integration (AWS S3, Cloudinary)
   - Direct file uploads

3. **Email Notifications**
   - Approval/rejection notifications
   - Weekly digest emails

4. **Advanced Analytics**
   - Machine learning for trend prediction
   - Recommendation system

5. **Mobile App**
   - React Native companion app
   - Push notifications
