const Sequelize = require('sequelize');
const sequelize = require('../../src/database/database'); // Caminho correto

const Paciente = require('./paciente')(sequelize, Sequelize.DataTypes);
const Medico = require('./medico')(sequelize, Sequelize.DataTypes);
const Consulta = require('./consulta')(sequelize, Sequelize.DataTypes);
const PlanoSaude = require('./planoSaude')(sequelize, Sequelize.DataTypes);
const Pagamento = require('./pagamento')(sequelize, Sequelize.DataTypes);
const RelatorioFinanceiro = require('./relatorioFinanceiro')(sequelize, Sequelize.DataTypes);
const ReceitaMedica = require('./receitaMedica')(sequelize, Sequelize.DataTypes);

// Defina as associações chamando a função associate de cada model
if (Paciente.associate) {
    Paciente.associate({ PlanoSaude, Consulta });
}
if (Medico.associate) {
    Medico.associate({ Consulta, ReceitaMedica });
}
if (Consulta.associate) {
    Consulta.associate({ Paciente, Medico, Pagamento, RelatorioFinanceiro, ReceitaMedica, PlanoSaude }); // Adicione PlanoSaude aqui se necessário para o método estático
}
if (PlanoSaude.associate) {
    PlanoSaude.associate({ Paciente });
}
if (Pagamento.associate) {
    Pagamento.associate({ Consulta });
}
if (RelatorioFinanceiro.associate) {
    RelatorioFinanceiro.associate({});
}
if (ReceitaMedica.associate) {
    ReceitaMedica.associate({ Consulta, Medico });
}

// Atualize a função estática buscarAgendamentosComPlanoValido para receber os models
Consulta.buscarAgendamentosComPlanoValido = Consulta.buscarAgendamentosComPlanoValido.bind(null, { Paciente, PlanoSaude, Medico });

module.exports = {
    Paciente,
    Medico,
    Consulta,
    PlanoSaude,
    Pagamento,
    RelatorioFinanceiro,
    ReceitaMedica,
    sequelize,
    Sequelize
};