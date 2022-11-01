const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'movie_db'
  },
  console.log(`Connected to the employee_db database.`)
);

//Inquirer questions
init(); 
function init() {
    inquirer.createPromptModule([
        {
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
                'Update an employee role'

            ]
        }
    ]).then((answers) => {
        switch(answers.init) {
            case 'View all Departments':
                viewDepartments();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View Employees by Manager':
                sortEmployees();
                break;
            case  'View Employees by Department':
                sortEmployees();
                break;
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Exit':
                console.log('Goodbye');
                break;
        }
    })
};


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);