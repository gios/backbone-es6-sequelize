var Sequelize = require('sequelize'),
    User = require('./User.js');

var Group = sequelize.define('Group',
{
    role: { type: Sequelize.STRING, unique: true }
}, {
    freezeTableName: true
});

Group.hasMany(User);
// User.belongsTo(Group);

Group.sync();
User.sync();

User.create({ username: "admin", password: "foo"});

Group.create({ role: "admin"});
Group.create({ role: "manager"});
Group.create({ role: "storage"});

module.exports = Group;
