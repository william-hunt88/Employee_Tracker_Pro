const cTable = require("console.table");
const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  // Your MySQL username
  user: "root",
  // Your MySQL password
  password: "Iaabmc88",
  database: "employee_tracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function dbCalls(answer) {
  switch (answer) {
    case "view all departments":
      allDepartments();
      break;
    case "view all employees":
      allEmployees();
      break;
    case "view all roles":
      allRoles();
      break;
  }
}

function allDepartments() {
  connection.execute(
    "SELECT * FROM department",
    function (err, results, fields) {
      console.table(results);
    }
  );
}

function allRoles() {
  connection.execute(
    "SELECT * FROM role",
    function (err, results, fields) {
      console.table(results);
    }
  );
}

function allEmployees() {
  connection.execute(
    "SELECT * FROM employees",
    function (err, results, fields) {
      console.table(results);
    }
  );
}

function addDepartmentDbCall(newData) {
  const sql = 'INSERT INTO department (name) VALUES(?)';
  const params = [newData]
  connection.execute(sql, params,
    function(err, res, fields) {
      console.log(res)
    });
}

module.exports = {dbCalls, addDepartmentDbCall};
