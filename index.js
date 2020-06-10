// Use the MySQL NPM package to connect to your MySQL database and perform queries.
const mysql = require("mysql");
// Use InquirerJs NPM package to interact with the user via the command-line.
const inquirer = require("inquirer");
// Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  runTracker();
});
// Build a command-line application that at a minimum allows the user to:
// Add departments, roles, employees
// View departments, roles, employees
// Update employee role
function runTracker() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add a department",
          "Add a role",
          "add an employee",
          "View a department",
          "View a role",
          "View an employee",
          "Update employee role",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "View a department":
          viewDepartment();
          break;

        case "View a role":
          viewRole();
          break;

        case "View an employee":
          viewEmployee();
          break;

        case "Update employee role":
          update();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.newDept,
      });
      const query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        cTable("All Departments:", res);
        runTracker();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What role would you like to add?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO role SET ?", {
        name: answer.newRole,
      });
      const query = "SELECT * FROM role";
      connection.query(query, function (err, res) {
        if (err) throw err;
        cTable("All Roles:", res);
        runTracker();
      });
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employee's role?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO employee SET ?", {
        firstName: answer.firstName,
        lastName: answer.lastName,
        role: answer.role,
      });
      const query = "SELECT * FROM employee";
      connection.query(query, function (err, res) {
        if (err) throw err;
        cTable("All Employees:", res);
        runTracker();
      });
    });
}
