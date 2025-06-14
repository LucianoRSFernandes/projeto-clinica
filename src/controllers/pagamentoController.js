const { sequelize } = require('../models');
const Pagamento = sequelize.models.Pagamento;
const Consulta = sequelize.models.Consulta;

// Listar todos os pagamentos
exports.listarPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll({
            include: [{ model: Consulta, as: 'consulta' }]
        });
        res.status(200).json(pagamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os pagamentos.' });
    }
};

// Obter um pagamento por ID
exports.obterPagamentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pagamento = await Pagamento.findByPk(id, {
            include: [{ model: Consulta, as: 'consulta' }]
        });
        if (pagamento) {
            res.status(200).json(pagamento);
        } else {
            res.status(404).json({ message: 'Pagamento não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter o pagamento.' });
    }
};

// Criar um novo pagamento
exports.criarPagamento = async (req, res) => {
    try {
        const novoPagamento = await Pagamento.create(req.body);
        res.status(201).json(novoPagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o pagamento.' });
    }
};

// Atualizar um pagamento
exports.atualizarPagamento = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Pagamento.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const pagamentoAtualizado = await Pagamento.findByPk(id, {
                include: [{ model: Consulta, as: 'consulta' }]
            });
            res.status(200).json(pagamentoAtualizado);
        } else {
            res.status(404).json({ message: 'Pagamento não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o pagamento.' });
    }
};

// Excluir um pagamento
exports.excluirPagamento = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Pagamento.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Pagamento não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o pagamento.' });
    }
};

module.exports = exports;