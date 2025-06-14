const { sequelize } = require('../models');
const PlanoSaude = sequelize.models.PlanoSaude;

// Listar todos os planos de saúde
exports.listarPlanosSaude = async (req, res) => {
    try {
        const planosSaude = await PlanoSaude.findAll();
        res.status(200).json(planosSaude);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os planos de saúde.' });
    }
};

// Obter um plano de saúde por ID
exports.obterPlanoSaudePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const planoSaude = await PlanoSaude.findByPk(id);
        if (planoSaude) {
            res.status(200).json(planoSaude);
        } else {
            res.status(404).json({ message: 'Plano de saúde não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter o plano de saúde.' });
    }
};

// Criar um novo plano de saúde
exports.criarPlanoSaude = async (req, res) => {
    try {
        const novoPlanoSaude = await PlanoSaude.create(req.body);
        res.status(201).json(novoPlanoSaude);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o plano de saúde.' });
    }
};

// Atualizar um plano de saúde
exports.atualizarPlanoSaude = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await PlanoSaude.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const planoSaudeAtualizado = await PlanoSaude.findByPk(id);
            res.status(200).json(planoSaudeAtualizado);
        } else {
            res.status(404).json({ message: 'Plano de saúde não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o plano de saúde.' });
    }
};

// Excluir um plano de saúde
exports.excluirPlanoSaude = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await PlanoSaude.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Plano de saúde não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o plano de saúde.' });
    }
};

module.exports = exports;