var Sequelize = require('sequelize'),
    User = require('./User.js');

var Group = sequelize.define('Group',
{
    id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    role: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    freezeTableName: true
});

Group.hasOne(User, { foreignKey: "group_id" });

Group.sync({ force: true }).then(function(group) {
    group.upsert({ role: "admin"});
    group.upsert({ role: "manager"});
    group.upsert({ role: "storage"});
});

User.sync({ force: true }).then(function(user) {
    user.upsert({ username: "admin", password: "foo"});
    user.upsert({ username: "petya", password: "foo"});
    user.upsert({ username: "vasya", password: "foo"});
});

module.exports = Group;
