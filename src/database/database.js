const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clinica_medica', 'root', 'seirei2008', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;