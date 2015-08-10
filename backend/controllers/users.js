var mysql = require("mysql");
var dbconfig = require("../config/database_credentials.js");
var connection = mysql.createConnection(dbconfig.connection);

connection.query("USE " + dbconfig.database);

function getSessionCredentials(typeId, callback) {
    connection.query("SELECT users.id, users.username, type.group, users.chapter_id " +
                     "FROM users " +
                     "INNER JOIN type " +
                     "ON users.type_id=" + typeId, function(err, rows) {
         if (err) return callback(err, null);
         connection.end();
         console.log(rows);
         callback(null, rows);
    });
}


module.exports = {
    getSessionCredentials: getSessionCredentials
};
