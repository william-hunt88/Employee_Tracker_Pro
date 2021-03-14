const mysql = require("mysql2");
const returnPassword = require('../configuration/configuration')


const connection = mysql.createConnection({
    host: "localhost",
    // Your MySQL username
    user: "root",
    // Your MySQL password
    password: returnPassword,
    database: "employee_tracker_db",
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  module.exports = connection;