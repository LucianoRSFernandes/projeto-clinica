const { sequelize } = require('../models');
const ReceitaMedica = sequelize.models.ReceitaMedica;
const Consulta = sequelize.models.Consulta;
const Medico = sequelize.models.Medico;

// Listar todas as receitas médicas
exports.listarReceitasMedicas = async (req, res) => {
    try {
        const receitas = await ReceitaMedica.findAll();
        res.status(200).json(receitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar as receitas médicas.' });
    }
};

// Obter uma receita médica por ID
exports.obterReceitaMedicaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const receita = await ReceitaMedica.findByPk(id, {
            include: [{ model: Consulta, as: 'consulta' }, { model: Medico, as: 'medico' }]
        });
        if (receita) {
            res.status(200).json(receita);
        } else {
            res.status(404).json({ message: 'Receita médica não encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter a receita médica.' });
    }
};

// Criar uma nova receita médica
exports.criarReceitaMedica = async (req, res) => {
    try {
        const novaReceita = await ReceitaMedica.create(req.body);
        res.status(201).json(novaReceita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar a receita médica.' });
    }
};

// Atualizar uma receita médica
exports.atualizarReceitaMedica = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await ReceitaMedica.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const receitaAtualizada = await ReceitaMedica.findByPk(id, {
                include: [{ model: Consulta, as: 'consulta' }, { model: Medico, as: 'medico' }]
            });
            res.status(200).json(receitaAtualizada);
        } else {
            res.status(404).json({ message: 'Receita médica não encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a receita médica.' });
    }
};

// Excluir uma receita médica
exports.excluirReceitaMedica = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await ReceitaMedica.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Receita médica não encontrada.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir a receita médica.' });
    }
};

module.exports = exports;