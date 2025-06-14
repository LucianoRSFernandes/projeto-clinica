const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PlanoSaude = sequelize.define('PlanoSaude', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        limiteCobertura: {
            type: DataTypes.DECIMAL(10, 2),
        },
        dataVencimento: {
            type: DataTypes.DATE,
        },
        operadora: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        tableName: 'PlanoSaude'
    });

    PlanoSaude.associate = (models) => {
        PlanoSaude.hasMany(models.Paciente, { foreignKey: 'planoSaudeId', as: 'pacientes' });
    };

    return PlanoSaude;
};