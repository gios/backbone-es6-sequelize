var mysql = require("mysql");
var dbconfig = require("../config/database_credentials.js");
var connection = mysql.createConnection(dbconfig.connection);

connection.query("USE " + dbconfig.database);

function getSessionCredentials(userData, callback) {
    console.log(userData.user_id);
    connection.query("SELECT id, username, type_id, chapter_id " +
                     "FROM users " +
                     "WHERE users.id=" + userData.user_id, function(err, rows) {
         if (err) return callback(err, null);
         connection.end();
         callback(null, rows);
    });
}


module.exports = {
    getSessionCredentials: getSessionCredentials
};
