-- UCU Innovators Hub - Database Seeding Script
-- This script populates the database with sample data for testing

-- Insert sample users
INSERT INTO users (id, name, email, password, role, faculty, department, created_at) VALUES
('user-1', 'Admin User', 'admin@ucu.ac.ug', '$2b$10$examplehashedpassword1', 'admin', 'Administration', 'IT Services', NOW()),
('user-2', 'Dr. John Supervisor', 'supervisor@ucu.ac.ug', '$2b$10$examplehashedpassword2', 'supervisor', 'Engineering, Design and Technology', 'Computing & Technology', NOW()),
('user-3', 'Jane Student', 'jane.student@ucu.ac.ug', '$2b$10$examplehashedpassword3', 'student', 'Engineering, Design and Technology', 'Computing & Technology', NOW()),
('user-4', 'Mark Developer', 'mark.dev@ucu.ac.ug', '$2b$10$examplehashedpassword4', 'student', 'Engineering, Design and Technology', 'Computing & Technology', NOW()),
('user-5', 'Sarah Innovator', 'sarah.inn@ucu.ac.ug', '$2b$10$examplehashedpassword5', 'student', 'Business & Administration', 'Business Administration', NOW());

-- Insert sample projects
INSERT INTO projects (id, title, description, category, faculty, department, technologies, github_url, live_url, document_url, year, status, author_id, team_members, created_at, updated_at) VALUES
('proj-1', 'UCU Student Portal Enhancement', 'A modern web application that enhances the UCU student portal with real-time notifications, improved UI/UX, and mobile responsiveness.', 'Web Application', 'Engineering, Design and Technology', 'Computing & Technology', 
ARRAY['React', 'Node.js', 'PostgreSQL', 'Express.js', 'Tailwind CSS'], 
'https://github.com/ucustudent/portal-enhancement', 
'https://ucu-portal-demo.vercel.app', 
'/uploads/portal-doc.pdf', 
2025, 
'approved', 
'user-3', 
ARRAY['Jane Student', 'Mark Developer'], 
NOW() - INTERVAL '30 days', 
NOW() - INTERVAL '20 days'),

('proj-2', 'Smart Library Management System', 'An IoT-enabled library system that tracks book locations, automates check-in/check-out, and provides real-time availability updates.', 'IoT/Hardware', 'Engineering, Design and Technology', 'Computing & Technology', 
ARRAY['Python', 'Raspberry Pi', 'RFID', 'MongoDB', 'Flask'], 
'https://github.com/ucustudent/smart-library', 
NULL, 
'/uploads/library-doc.pdf', 
2025, 
'approved', 
'user-4', 
ARRAY['Mark Developer'], 
NOW() - INTERVAL '25 days', 
NOW() - INTERVAL '15 days'),

('proj-3', 'Campus Navigation Mobile App', 'A mobile application that helps new students and visitors navigate the UCU campus using AR technology and interactive maps.', 'Mobile App', 'Engineering, Design and Technology', 'Computing & Technology', 
ARRAY['React Native', 'Firebase', 'Google Maps API', 'AR Core'], 
'https://github.com/ucustudent/campus-nav', 
'https://play.google.com/store/apps/details?id=com.ucu.campusnav', 
'/uploads/campus-nav-doc.pdf', 
2024, 
'approved', 
'user-3', 
ARRAY['Jane Student', 'Sarah Innovator'], 
NOW() - INTERVAL '90 days', 
NOW() - INTERVAL '60 days'),

('proj-4', 'Business Analytics Dashboard', 'A comprehensive analytics platform for small and medium enterprises in Uganda to track sales, inventory, and customer insights.', 'Web Application', 'Business & Administration', 'Business Administration', 
ARRAY['Vue.js', 'Django', 'PostgreSQL', 'Chart.js', 'Redis'], 
'https://github.com/ucustudent/biz-analytics', 
'https://biz-analytics-demo.herokuapp.com', 
'/uploads/biz-analytics-doc.pdf', 
2024, 
'approved', 
'user-5', 
ARRAY['Sarah Innovator'], 
NOW() - INTERVAL '120 days', 
NOW() - INTERVAL '90 days'),

('proj-5', 'AI-Powered Study Assistant', 'An artificial intelligence application that helps students study more effectively using spaced repetition, personalized quizzes, and progress tracking.', 'AI/Machine Learning', 'Engineering, Design and Technology', 'Computing & Technology', 
ARRAY['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'], 
'https://github.com/ucustudent/ai-study-assistant', 
'https://study-assistant-ai.vercel.app', 
'/uploads/ai-study-doc.pdf', 
2025, 
'pending', 
'user-4', 
ARRAY['Mark Developer', 'Jane Student'], 
NOW() - INTERVAL '5 days', 
NOW() - INTERVAL '5 days');

-- Insert sample comments
INSERT INTO comments (id, project_id, user_id, content, created_at) VALUES
('comment-1', 'proj-1', 'user-2', 'Excellent work on the UI design! The portal is much more intuitive now.', NOW() - INTERVAL '18 days'),
('comment-2', 'proj-1', 'user-4', 'Thanks for the feedback! We focused heavily on user experience.', NOW() - INTERVAL '17 days'),
('comment-3', 'proj-2', 'user-2', 'The RFID integration is impressive. Have you considered adding a mobile app component?', NOW() - INTERVAL '12 days'),
('comment-4', 'proj-3', 'user-5', 'The AR features are really cool! This will help freshers a lot.', NOW() - INTERVAL '55 days'),
('comment-5', 'proj-4', 'user-2', 'Great visualization of business metrics. The dashboard is very professional.', NOW() - INTERVAL '85 days');

-- Insert sample approvals
INSERT INTO approvals (id, project_id, reviewer_id, status, comment, reviewed_at) VALUES
('approval-1', 'proj-1', 'user-2', 'approved', 'Outstanding project with great attention to detail. Approved for showcase.', NOW() - INTERVAL '20 days'),
('approval-2', 'proj-2', 'user-2', 'approved', 'Innovative use of IoT technology. Well documented and implemented.', NOW() - INTERVAL '15 days'),
('approval-3', 'proj-3', 'user-2', 'approved', 'Excellent mobile application with practical use case.', NOW() - INTERVAL '60 days'),
('approval-4', 'proj-4', 'user-2', 'approved', 'Professional business solution with strong technical implementation.', NOW() - INTERVAL '90 days');

-- Verify data insertion
SELECT 'Users created:', COUNT(*) FROM users;
SELECT 'Projects created:', COUNT(*) FROM projects;
SELECT 'Comments created:', COUNT(*) FROM comments;
SELECT 'Approvals created:', COUNT(*) FROM approvals;
