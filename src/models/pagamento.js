const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pagamento = sequelize.define('Pagamento', {
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
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        dataPagamento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        formaPagamento: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'Pagamento'
    });

    Pagamento.associate = (models) => {
        Pagamento.belongsTo(models.Consulta, { foreignKey: 'consultaid', as: 'consulta' });
    };

    return Pagamento;
};