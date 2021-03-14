const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection.js");

const initialPrompt = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initial",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.initial) {
        case "view all departments":
          allDepartments();
          break;
        case "view all employees":
          allEmployees();
          break;
        case "view all roles":
          allRoles();
          break;
        case "add a department":
          departmentAdd();
          break;
        case "add a role":
          roleAdd();
          break;
        case "add an employee":
          employeeAddPrompt();
          break;
        case "update an employee role":
          updateEmployee();
          break;
      }
    });
};

function allDepartments() {
  connection.query("SELECT * FROM department", function (err, results, fields) {
    console.table(results);
    initialPrompt();
  });
}

function allRoles() {
  connection.query("SELECT * FROM role", function (err, results, fields) {
    console.table(results);
    initialPrompt();
  });
}

function allEmployees() {
  connection.query("SELECT * FROM employees", function (err, results, fields) {
    console.table(results);
    initialPrompt();
  });
}

function departmentAdd() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentAdd",
      message: "What department would you like to add?",
    })
    .then((answer) => {
      const sql = "INSERT INTO department (name) VALUES(?)";
      const params = [answer.departmentAdd];
      connection.query(sql, params, function (err, res, fields) {
        if (err) throw err;
        console.log(res.affectedRows + " departments added!");
        initialPrompt();
      });
    });
}

async function roleAdd() {
  connection.query("SELECT * FROM department", async function (err, data) {
    // store all department choices in a constant to use for choices
    const departmentChoices = data.map(({ name, id }) => {
      return { name: name, value: id };
    });
    // destructure anticipated response to use in INSERT statement
    const { name, salary } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the role you would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
    ]);
    // // destructure anticipated response to use in INSERT statement
    const { department } = await inquirer.prompt({
      type: "list",
      name: "department",
      message: "What is the name of the role you would like to add?",
      choices: departmentChoices,
    });
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: name,
        salary: salary,
        department_id: department,
      },
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " role inserted!");
        initialPrompt();
      }
    );
  });
}

async function updateEmployee() {
  connection.query("SELECT * FROM EMPLOYEES", async function (err, data) {
    if (err) throw err;
    // store employe choices in a constant to use in choices
    var employeeChoices = data.map(({ id, first_name, last_name }) => {
      return { name: `${first_name} ${last_name}`, value: id };
    });
    // destructure anticipated response to use in UPDATE statement
    const { employeeId } = await inquirer.prompt({
      type: "list",
      name: "employeeId",
      message: "Which employee would you like to update?",
      choices: employeeChoices,
    });
    connection.query("SELECT * FROM role", async function (err, data) {
      // destructure anticipated response to use in choices
      var roleChoices = data.map(({ id, title }) => {
        return { name: title, value: id };
      });
      // destructure anticipated response to use in UPDATE statement
      const { roleId } = await inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "Which role would you like to give the employee?",
        choices: roleChoices,
      });
      connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
      initialPrompt();
    });
  });
}

async function employeeAddPrompt() {
  connection.query(
    "SELECT employees.first_name, employees.last_name FROM employees WHERE employees.role_id = 1 OR employees.role_id = 2 OR employees.id = 3 OR employees.id = 4",
    await function (err, data) {
      if (err) throw err;
      // store manager choices in a constant to use in choices
      var managerChoices = data.map(({ first_name, last_name }) => {
        return { name: `${first_name} ${last_name}` };
      });
      connection.query("SELECT * FROM role", async function (err, data) {
        // store role choices in a constant to use in choices
        var roleChoices = data.map(({ id, title }) => {
          return { name: title, value: id };
        });
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employees first name?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employees last name?",
            },
            {
              type: "list",
              name: "role_id",
              message: "What is the new employees role?",
              choices: roleChoices,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is the employees manager?",
              choices: managerChoices,
            },
          ])
          .then((answers) => {
            // store split first_name and last_name of manager to use in SELECT statement to get RoleId for manager
            let managerName = answers.manager.split(" ");
            connection.query(
              "SELECT * FROM employees WHERE first_name = ? AND last_name = ?",
              [managerName[0], managerName[1]],
              async function (err, data) {
                if (err) throw err;
                // create new employee object for INSERT statement
                var manager = data.map(
                  ({ first_name, last_name, role_id, manager_id }) => {
                    return {
                      first_name: `${first_name}`,
                      last_name: `${last_name}`,
                      role_id: `${role_id}`,
                      manager_id: `${manager_id}`,
                    };
                  }
                );
                connection.query(
                  "INSERT INTO employees SET ?",
                  {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: answers.role_id,
                    manager_id: manager[0].role_id,
                  },
                  function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee inserted!");
                    initialPrompt();
                  }
                );
              }
            );
          });
      });
    }
  );
}

initialPrompt();

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
