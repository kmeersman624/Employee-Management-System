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
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a department, role, or employee",
        "View a department, role, or employee",
        "Update employee role",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a department, role, or employee":
          add();
          break;

        case "View a department, role, or employee":
          view();
          break;

        case "Update employee role":
          update();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });

  function add() {
    inquirer
      .prompt({
        name: "add",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a department", "Add a role", "Add an employee"],
      })
      .then(function (answer) {
        // var query = "SELECT position, song, year FROM top5000 WHERE ?";
        // connection.query(query, { artist: answer.artist }, function(err, res) {
        //   if (err) throw err;
        //   for (var i = 0; i < res.length; i++) {
        //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        //   }
        runTracker();
      });
    //   });
  }
}
function view() {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "What would you like to do?",
      choices: ["View a department", "View a role", "View an employee"],
    })
    .then(function (answer) {
      runTracker();
    });
}

function update() {
  inquirer
    .prompt({
      name: "update",
      type: "input",
      message: "What role would you like to update?",
    })
    .then(function (answer) {
      runTracker();
    });
}
