const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

db.connect(err => {
    if (err) throw err;

    console.log('Employee Tracker started.');

    init();
})


//Startup question
function init() {
            inquirer.prompt([{
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: [
                'View all Departments', 
                'View all roles', 
                'View all employees', 
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ]
            }])
            .then(response => {
                switch (response.init) {
                    case 'View all departments':
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
                    case 'View all employees':
                        viewEmployees();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Update an employee role':
                        updateEmployee();
                        break;
                    case 'Quit':
                        console.log('Goodbye')
                        db.end();
                     
                        break;
                }
            })
    };


function viewDepartments() {
    db.query('SELECT * FROM departments', (error, result) => {
        if (error) throw error;

        console.table(result);

        init();
    })
};

function viewRoles() {
    db.query('SELECT * FROM roles', (error, result) => {
        if (error) throw error;

        console.table(result);

        init();
    })
};

function viewEmployees() {
    db.query('SELECT * FROM employees union SELECT * FROM managers', (error, result) => {
        if (error) throw error;

        console.table(result);

        init();
    })
};

function addDepartment() {
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Input the department name: '
    }])
        .then(response => {
            db.query('INSERT INTO departments (name) VALUES (?)', [response.name], (error, result) => {
                if (error) throw error;
            })

            viewDepartments();
        })
};

function addRole() {
    inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'Input the role title: '
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Input salary: ',
        validate: salary => {
            if (salary) {
                return true;
            } else {
                console.log('Please enter a valid number');
                return false;
            }
        }
    },
    {
        name: 'department',
        type: 'list',
        message: 'Select from departments:',
        choices: getDepartments()
    }
    ])
        .then(res => {
            db.query('INSERT INTO roles SET ?', {
                title: res.role,
                salary: res.salary,
                department_id: res.department
            },

                (err, res) => {
                    if (err) throw err;
                    console.log('Role has been added')

                    menu();
                })
        })
};

function addEmployee() {
    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'Input first name of employee: '
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'Input last name of employee: '
    },
    {
        name: 'role',
        type: 'list',
        message: 'Select role:',
        choices: getRoles()
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Select reporting manager:',
        choices: getManagers()
    }
    ])
        .then(response => {

            db.query('INSERT INTO employees SET ?', {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.role,
                manager_id: response.manager
            },

                (err, res) => {
                    if (err) throw err;
                    console.log('Employee created.')

                    menu();
                })
        })
    };

    function updateEmployee() {
        inquirer.prompt([{
                    name: 'employee',
                    type: 'number',
                    message: 'Enter employee ID'
                },
                {
                    name: 'role',
                    type: 'number',
                    message: 'Enter role ID:'
                }
            ])
            .then(response => {
                db.query('UPDATE employees SET role_id = ? WHERE id = ? ', [response.role, response.employee], (error, result) => {
                    if (error) throw error;
    
                    viewEmployees();
                })
            })
    };