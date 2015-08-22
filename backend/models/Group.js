var Sequelize = require('sequelize'),
    User = require('./User.js');

var Group = sequelize.define('Group',
{
    id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    role: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    freezeTableName: true
});

User.belongsToMany(Group, { through: 'role' });
// Group.belongsToMany(User);
// User.hasOne(Group);

Group.sync({ force: true }).then(function() {
    Group.upsert({ role: "admin"});
    Group.upsert({ role: "manager"});
    Group.upsert({ role: "storage"});
});
User.sync({ force: true }).then(function() {
    User.upsert({ username: "admin", password: "foo"});
    User.upsert({ username: "petya", password: "foo"});
    User.upsert({ username: "vasya", password: "foo"});
});

module.exports = Group;
