const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ReceitaMedica = sequelize.define('ReceitaMedica', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        consultaid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Consulta',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        medicoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Medico',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        descricaoMedicamento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tempoTratamento: {
            type: DataTypes.STRING,
        },
        dosagem: {
            type: DataTypes.STRING,
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
        tableName: 'ReceitaMedica'
    });

    ReceitaMedica.associate = (models) => {
        ReceitaMedica.belongsTo(models.Consulta, { foreignKey: 'consultaid', as: 'consulta' });
        ReceitaMedica.belongsTo(models.Medico, { foreignKey: 'medicoId', as: 'medico' });
    };

    return ReceitaMedica;
};