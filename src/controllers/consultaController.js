const { sequelize } = require('../models');
const Consulta = sequelize.models.Consulta;
const Paciente = sequelize.models.Paciente;
const Medico = sequelize.models.Medico;
const Pagamento = sequelize.models.Pagamento;
const RelatorioFinanceiro = sequelize.models.RelatorioFinanceiro;
const PlanoSaude = sequelize.models.PlanoSaude; // Mantenha esta importação se estiver usando

// Listar todas as consultas
exports.listarConsultas = async (req, res) => {
    try {
        const consultas = await Consulta.findAll({
            include: [
                { model: Paciente, as: 'paciente', include: [{ model: PlanoSaude, as: 'planoSaude' }] }, // Incluindo PlanoSaude no Paciente
                { model: Medico, as: 'medico' },
                { model: Pagamento, as: 'pagamento' },
                { model: RelatorioFinanceiro, as: 'relatorioFinanceiro' }
            ]
        });
        res.status(200).json(consultas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar as consultas.' });
    }
};

// Obter uma consulta por ID
exports.obterConsultaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const consulta = await Consulta.findByPk(id, {
            include: [
                { model: Paciente, as: 'paciente', include: [{ model: PlanoSaude, as: 'planoSaude' }] }, // Incluindo PlanoSaude no Paciente
                { model: Medico, as: 'medico' },
                { model: Pagamento, as: 'pagamento' },
                { model: RelatorioFinanceiro, as: 'relatorioFinanceiro' }
            ]
        });
        if (consulta) {
            res.status(200).json(consulta);
        } else {
            res.status(404).json({ message: 'Consulta não encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter a consulta.' });
    }
};

// Criar uma nova consulta
exports.criarConsulta = async (req, res) => {
    const { pacienteId } = req.body; // Assumindo que o pacienteId é enviado no body
    try {
        // Busca o paciente para verificar se o plano de saúde é válido
        const paciente = await Paciente.findByPk(pacienteId, {
            include: [{ model: PlanoSaude, as: 'planoSaude' }]
        });

        if (!paciente || !paciente.planoSaude || !paciente.planoSaude.ativo) {
            return res.status(400).json({ message: 'Paciente não encontrado ou plano de saúde inválido.' });
        }

        const novaConsulta = await Consulta.create(req.body);
        res.status(201).json(novaConsulta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar a consulta.' });
    }
};

// Atualizar uma consulta
exports.atualizarConsulta = async (req, res) => {
    const { id } = req.params;
    const { pagamentoId, ...outrosDados } = req.body;
    try {
        const [updated] = await Consulta.update({ ...outrosDados, pagamentoId }, {
            where: { id: id }
        });
        if (updated) {
            const consultaAtualizada = await Consulta.findByPk(id, {
                include: [
                    { model: Paciente, as: 'paciente', include: [{ model: PlanoSaude, as: 'planoSaude' }] }, // Incluindo PlanoSaude no Paciente
                    { model: Medico, as: 'medico' },
                    { model: Pagamento, as: 'pagamento' },
                    { model: RelatorioFinanceiro, as: 'relatorioFinanceiro' }
                ]
            });
            res.status(200).json(consultaAtualizada);
        } else {
            res.status(404).json({ message: 'Consulta não encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a consulta.' });
    }
};

// Excluir uma consulta
exports.excluirConsulta = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Consulta.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Consulta não encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir a consulta.' });
    }
};

// Nova função para buscar agendamentos com plano válido
exports.listarAgendamentosComPlanoValido = async (req, res) => {
    try {
        const agendamentos = await Consulta.buscarAgendamentosComPlanoValido();
        res.status(200).json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar agendamentos com plano válido:', error);
        res.status(500).json({ message: 'Erro ao buscar agendamentos com plano válido.', error: error.message });
    }
};

module.exports = exports;