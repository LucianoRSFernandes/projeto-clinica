const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Paciente = sequelize.define('Paciente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
        },
        dataNascimento: {
            type: DataTypes.DATE,
        },
        telefone: {
            type: DataTypes.STRING,
        },
        planoSaudeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'PlanoSaude',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isNumeric: true,
                len: [11, 11],
            },
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
        tableName: 'Paciente'
    });

    Paciente.associate = (models) => {
        Paciente.belongsTo(models.PlanoSaude, { foreignKey: 'planoSaudeId', as: 'planoSaude' });
        Paciente.hasMany(models.Consulta, { foreignKey: 'pacienteId', as: 'consultas' });
    };

    return Paciente;
};