CREATE DATABASE IF NOT EXISTS company;

USE company;

CREATE TABLE IF NOT EXISTS employees (
    EmpID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50),
    Salary INT,
    Designation VARCHAR(50)
);
