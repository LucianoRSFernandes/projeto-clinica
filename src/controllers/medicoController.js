const { sequelize } = require('../models');
const Medico = sequelize.models.Medico;

// Listar todos os médicos
exports.listarMedicos = async (req, res) => {
    try {
        const medicos = await Medico.findAll();
        res.status(200).json(medicos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os médicos.' });
    }
};

// Obter um médico por ID
exports.obterMedicoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const medico = await Medico.findByPk(id);
        if (medico) {
            res.status(200).json(medico);
        } else {
            res.status(404).json({ message: 'Médico não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter o médico.' });
    }
};

// Criar um novo médico
exports.criarMedico = async (req, res) => {
    try {
        const novoMedico = await Medico.create(req.body);
        res.status(201).json(novoMedico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o médico.' });
    }
};

// Atualizar um médico
exports.atualizarMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Medico.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const medicoAtualizado = await Medico.findByPk(id);
            res.status(200).json(medicoAtualizado);
        } else {
            res.status(404).json({ message: 'Médico não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o médico.' });
    }
};

// Excluir um médico
exports.excluirMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Medico.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Médico não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o médico.' });
    }
};

module.exports = exports;