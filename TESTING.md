# Testing Documentation

## Testing Strategy

UCU Innovators Hub employs a comprehensive testing approach covering unit tests, integration tests, and end-to-end testing.

## Testing Pyramid

\`\`\`
        ┌──────────┐
        │   E2E    │  ← Critical user flows
        ├──────────┤
        │Integration│  ← API endpoints
        ├──────────┤
        │   Unit   │  ← Business logic
        └──────────┘
\`\`\`

## Unit Testing

### Utilities Testing

**lib/validation.ts**
\`\`\`typescript
describe('validateEmail', () => {
  it('should accept valid email addresses', () => {
    expect(validateEmail('student@ucu.ac.ug')).toBe(true)
    expect(validateEmail('john.doe@example.com')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
    expect(validateEmail('test@')).toBe(false)
  })
})

describe('validatePassword', () => {
  it('should accept strong passwords', () => {
    const result = validatePassword('SecurePass123')
    expect(result.valid).toBe(true)
  })

  it('should reject weak passwords', () => {
    const result = validatePassword('weak')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
  })
})

describe('validateProjectSubmission', () => {
  it('should validate complete project data', () => {
    const data = {
      title: 'Test Project',
      description: 'This is a test project description',
      faculty: 'Engineering',
      department: 'Computer Science',
      year: 2024,
      technologies: ['React', 'Node.js']
    }
    const result = validateProjectSubmission(data)
    expect(result.valid).toBe(true)
  })

  it('should reject incomplete project data', () => {
    const data = { title: 'Test' }
    const result = validateProjectSubmission(data)
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })
})
\`\`\`

### Authentication Testing

**lib/auth.ts**
\`\`\`typescript
describe('Authentication', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', async () => {
      const token = await generateToken(1, 'test@ucu.ac.ug', 'student')
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
    })
  })

  describe('verifyToken', () => {
    it('should verify a valid token', async () => {
      const token = await generateToken(1, 'test@ucu.ac.ug', 'student')
      const payload = await verifyToken(token)
      expect(payload).toBeDefined()
      expect(payload?.userId).toBe(1)
      expect(payload?.email).toBe('test@ucu.ac.ug')
    })

    it('should reject an invalid token', async () => {
      const payload = await verifyToken('invalid-token')
      expect(payload).toBeNull()
    })
  })
})
\`\`\`

## Integration Testing

### API Endpoint Testing

**Authentication Endpoints**
\`\`\`typescript
describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'newuser@ucu.ac.ug',
        password: 'SecurePass123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        faculty: 'Engineering'
      })
    })
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.user).toBeDefined()
    expect(data.token).toBeDefined()
  })

  it('should reject duplicate email', async () => {
    // Register first time
    await fetch('/api/auth/register', { /* ... */ })
    
    // Try to register again with same email
    const response = await fetch('/api/auth/register', { /* ... */ })
    expect(response.status).toBe(409)
  })
})

describe('POST /api/auth/login', () => {
  it('should authenticate valid credentials', async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@ucu.ac.ug',
        password: 'SecurePass123'
      })
    })
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.token).toBeDefined()
  })

  it('should reject invalid credentials', async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@ucu.ac.ug',
        password: 'wrongpassword'
      })
    })
    expect(response.status).toBe(401)
  })
})
\`\`\`

**Project Endpoints**
\`\`\`typescript
describe('GET /api/projects', () => {
  it('should return approved projects', async () => {
    const response = await fetch('/api/projects')
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.projects).toBeInstanceOf(Array)
  })

  it('should filter by faculty', async () => {
    const response = await fetch('/api/projects?faculty=Engineering')
    const data = await response.json()
    expect(data.projects.every(p => p.faculty === 'Engineering')).toBe(true)
  })
})

describe('POST /api/projects', () => {
  it('should create project with valid token', async () => {
    const token = 'valid-jwt-token'
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Project',
        description: 'Test description',
        faculty: 'Engineering',
        department: 'CS',
        year: 2024,
        technologies: ['React']
      })
    })
    expect(response.status).toBe(201)
  })

  it('should reject request without token', async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* ... */ })
    })
    expect(response.status).toBe(401)
  })
})
\`\`\`

## End-to-End Testing

### Critical User Flows

**Student Registration and Project Submission**
\`\`\`typescript
describe('Student Flow', () => {
  it('should complete full registration and submission flow', async () => {
    // 1. Navigate to registration page
    await page.goto('/auth/register')
    
    // 2. Fill registration form
    await page.fill('input[name="email"]', 'student@ucu.ac.ug')
    await page.fill('input[name="password"]', 'SecurePass123')
    await page.fill('input[name="firstName"]', 'John')
    await page.fill('input[name="lastName"]', 'Doe')
    await page.selectOption('select[name="role"]', 'student')
    
    // 3. Submit registration
    await page.click('button[type="submit"]')
    
    // 4. Verify redirect to dashboard
    await page.waitForURL('/dashboard/student')
    expect(page.url()).toContain('/dashboard/student')
    
    // 5. Navigate to submission page
    await page.click('text=Submit New Project')
    
    // 6. Fill project form
    await page.fill('input[name="title"]', 'My Innovation')
    await page.fill('textarea[name="description"]', 'Description here')
    await page.selectOption('select[name="faculty"]', 'Engineering')
    
    // 7. Submit project
    await page.click('button[type="submit"]')
    
    // 8. Verify success
    await page.waitForSelector('text=Project submitted successfully')
  })
})
\`\`\`

**Supervisor Review Flow**
\`\`\`typescript
describe('Supervisor Flow', () => {
  it('should review and approve project', async () => {
    // 1. Login as supervisor
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', 'supervisor@ucu.ac.ug')
    await page.fill('input[name="password"]', 'SecurePass123')
    await page.click('button[type="submit"]')
    
    // 2. Navigate to pending projects
    await page.waitForURL('/dashboard/supervisor')
    await page.click('text=Pending')
    
    // 3. Review project
    const firstProject = page.locator('.project-card').first()
    await firstProject.click()
    
    // 4. Approve project
    await page.click('button:has-text("Approve")')
    
    // 5. Verify approval
    await page.waitForSelector('text=Project approved')
  })
})
\`\`\`

## Test Coverage Goals

- **Unit Tests:** 80%+ coverage
- **Integration Tests:** All API endpoints
- **E2E Tests:** Critical user flows

## Running Tests

\`\`\`bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm test validation.test.ts
\`\`\`

## Continuous Integration

Tests should run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment

## Manual Testing Checklist

### Authentication
- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] JWT token is properly stored
- [ ] Token expiration is handled

### Project Submission
- [ ] Student can submit project with all required fields
- [ ] Form validation works correctly
- [ ] File uploads work (if implemented)
- [ ] Submission appears in dashboard
- [ ] Status updates correctly

### Search and Filtering
- [ ] Search returns relevant results
- [ ] Faculty filter works
- [ ] Year filter works
- [ ] Multiple filters work together
- [ ] Clear filters button works

### Dashboard
- [ ] Student dashboard shows correct data
- [ ] Supervisor dashboard shows pending projects
- [ ] Admin dashboard shows analytics
- [ ] Charts render correctly
- [ ] Statistics are accurate

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators visible
- [ ] Form labels properly associated

### Performance
- [ ] Pages load in < 3 seconds
- [ ] No layout shift on load
- [ ] Images optimized
- [ ] API responses < 500ms

### Security
- [ ] SQL injection prevented
- [ ] XSS attacks prevented
- [ ] CSRF protection in place
- [ ] Sensitive data not exposed
- [ ] Password requirements enforced
