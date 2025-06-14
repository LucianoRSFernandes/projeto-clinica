const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Consulta = sequelize.define('Consulta', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pacienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Paciente',
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
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
        },
        pagamentoId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Pagamento',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        receitaEmitida: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        relatorioFinanceiroId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'RelatorioFinanceiro',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
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
        tableName: 'Consulta'
    });

    Consulta.associate = (models) => {
        Consulta.belongsTo(models.Paciente, { foreignKey: 'pacienteId', as: 'paciente' });
        Consulta.belongsTo(models.Medico, { foreignKey: 'medicoId', as: 'medico' });
        Consulta.belongsTo(models.Pagamento, { foreignKey: 'pagamentoId', as: 'pagamento' });
        Consulta.belongsTo(models.RelatorioFinanceiro, { foreignKey: 'relatorioFinanceiroId', as: 'relatorioFinanceiro' });
    };

    Consulta.buscarAgendamentosComPlanoValido = async function(models) {
        try {
            const agendamentos = await Consulta.findAll({
                include: [
                    {
                        model: models.Paciente,
                        as: 'paciente',
                        include: [
                            {
                                model: models.PlanoSaude,
                                as: 'planoSaude',
                                where: { ativo: true },
                                required: true,
                            },
                        ],
                        required: true,
                    },
                    {
                        model: models.Medico,
                        as: 'medico',
                    },
                ],
            });
            return agendamentos;
        } catch (error) {
            console.error('Erro ao buscar agendamentos com plano válido:', error);
            throw error;
        }
    };

    return Consulta;
};