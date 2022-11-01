USE employee_db;

INSERT INTO departments(department_name)
VALUES
('Marketing'),
('IT'),
('HR'),
('Legal');

INSERT INTO roles(job_title, salary, department_id) 
VALUES 
('Marketing Lead', 80000, 1),
('Marketer', 55000, 2),
('Lead Engineer', 120000, 2),
('Accountant', 85000, 1),
('Assistant', 46000, 4),
('Attorney', 100000, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Farley', 'Whittles', 1, null),
('Walter', 'White', 2, 1),
('Jack', 'Skellington', 2, 1),
('Michael', 'Myers', 3, null),
('Naruto', 'Uzumaki', 4, 4),
('Lightning', 'McQueen', 4, 4),
('Jack', 'Sparrow', 5, null);

