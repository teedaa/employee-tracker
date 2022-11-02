
INSERT INTO departments(name)
VALUES
('Marketing'),
('IT'),
('HR'),
('Legal');

INSERT INTO roles(title, salary, department_id) 
VALUES 
('Marketing Lead', 80000, 1),
('Marketer', 55000, 1),
('Lead Engineer', 120000, 2),
('Junior Engineer', 85000, 2),
('Assistant', 46000, 3),
('Attorney', 100000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Farley', 'Whittles', 1, null),
('Walter', 'White', 2, 1),
('Jack', 'Skellington', 2, 1),
('Michael', 'Myers', 3, null),
('Naruto', 'Uzumaki', 4, 4),
('Lightning', 'McQueen', 4, 4),
('Jack', 'Sparrow', 5, null);


INSERT INTO managers (first_name, last_name, role_id, department_id)
VALUES
('DJ', 'Pauly D', 1, 1),
('Kid', 'Cudi', 2, 2),
('Action', 'Bronson', 3, 3);