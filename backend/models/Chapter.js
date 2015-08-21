var Sequelize = require('sequelize');

var User = sequelize.define('User',
{
    username: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING
}, {
    freezeTableName: true
});

User.sync();

User.upsert({ username: "admin", password: "foo"});
module.exports = User;
