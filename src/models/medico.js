const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Medico = sequelize.define('Medico', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        especialidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crm: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'Medico'
    });

    Medico.associate = (models) => {
        Medico.hasMany(models.Consulta, { foreignKey: 'medicoId', as: 'consultas' });
        Medico.hasMany(models.ReceitaMedica, { foreignKey: 'medicoId', as: 'receitasMedicas' });
    };

    return Medico;
};