DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;
USE tracker_db;


CREATE TABLE departments (
id INT PRIMARY KEY AUTO_INCREMENT ,
name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES departments(id)
);



CREATE TABLE managers (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT ,
department_id INT,
FOREIGN KEY (role_id)
REFERENCES roles(id),
FOREIGN KEY (department_id)
REFERENCES departments(id)
);

CREATE TABLE employees (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT ,
manager_id INT DEFAULT NULL,
FOREIGN KEY (role_id)
REFERENCES roles(id),
FOREIGN KEY (manager_id)
REFERENCES managers(id)
);