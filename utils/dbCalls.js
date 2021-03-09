function dbCalls(answer) {
  var string = JSON.stringify(answer.initial)
  switch(string) {
    case "view all employees":
      allEmployees();
  }

}

function allEmployees() {
  console.log("here");
}

module.exports = dbCalls;
