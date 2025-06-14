const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RelatorioFinanceiro = sequelize.define('RelatorioFinanceiro', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dataEmissao: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        valorTotalConsultas: {
            type: DataTypes.DECIMAL(10, 2),
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
        tableName: 'RelatorioFinanceiro'
    });

    RelatorioFinanceiro.associate = (models) => {
        // Se houver associações no futuro, elas entrarão aqui
    };

    return RelatorioFinanceiro;
};