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