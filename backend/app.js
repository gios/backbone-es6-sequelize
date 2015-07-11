var express = require("express");
var mysql = require("mysql");
var app = express();

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "0987654321",
  database : "intime"
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function(err, rows, fields) {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.end();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log('Example app listening at localhost:3000');
});
