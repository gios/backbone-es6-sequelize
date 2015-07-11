function getSQL(query, callback) {
  var mysql = require("mysql");
  var _ = require("lodash");

  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "0987654321",
    database : "intime"
  });

  connection.connect();
  var json = "";
  var runningQuery = query || "SELECT 1 + 1 AS solution";

  connection.query(runningQuery, function(err, rows, fields) {
    if (err) return callback(err, null);

    console.log("The Result is: ", rows);

    connection.end();

    callback(null, rows);
  });
}

module.exports = getSQL;
