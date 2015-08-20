var User = require("../db/User.js");

function getSessionCredentials(userData, callback) {
    User.find({ where: { id: userData.user_id }}).then(function(user) {
        callback(null, user);
    }).catch(function(err){
        callback(err, null);
    });
}


module.exports = {
    getSessionCredentials: getSessionCredentials
};
