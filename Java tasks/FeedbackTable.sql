-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS feedback_system;

-- Use the newly created or existing database
USE feedback_system;

-- Create the feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    category VARCHAR(50),
    rating INT,
    aspects TEXT,
    comments TEXT,
    timestamp VARCHAR(50)
);
