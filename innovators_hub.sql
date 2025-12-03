CREATE DATABASE ucu_innovators_hub;
USE ucu_innovators_hub;
-- 1. DEPARTMENTS TABLE
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(150) NOT NULL,
    faculty_id INT NOT NULL,
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
);
-- 2. FACULTIES TABLE
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'supervisor', 'admin') NOT NULL DEFAULT 'student',
    faculty_id INT,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
-- 3. DEPARTMENTS TABLE
CREATE TABLE faculties (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_name VARCHAR(150) NOT NULL
);
-- 4. CATEGORIES TABLE
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);
-- 5. PROJECTS TABLE
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    supervisor_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    faculty_id INT,
    department_id INT,
    github_link VARCHAR(255),
    document_link VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (supervisor_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
-- 6. TECHNOLOGIES TABLE
CREATE TABLE technologies (
    tech_id INT AUTO_INCREMENT PRIMARY KEY,
    tech_name VARCHAR(100) NOT NULL
);
-- 7. PROJECT TECHNOLOGIES (Many-to-Many)
CREATE TABLE project_technologies (
    project_id INT NOT NULL,
    tech_id INT NOT NULL,
    PRIMARY KEY (project_id, tech_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (tech_id) REFERENCES technologies(tech_id) ON DELETE CASCADE
);
-- 8. COMMENTS TABLE
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- 9. ACTIVITY LOG (OPTIONAL, good for analytics)
CREATE TABLE activity_log (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    project_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);