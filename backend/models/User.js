var Sequelize = require('sequelize');

var User = sequelize.define('User',
{
    id: {
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING
}, {
    freezeTableName: true
});

module.exports = User;
