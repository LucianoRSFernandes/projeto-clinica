const { sequelize } = require('../models');
const Paciente = sequelize.models.Paciente

// Listar todos os pacientes
exports.listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.status(200).json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os pacientes.' });
    }
};

// Obter um paciente por ID
exports.obterPacientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id);
        if (paciente) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ message: 'Paciente não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter o paciente.' });
    }
};

// Criar um novo paciente
exports.criarPaciente = async (req, res) => {
    try {
        const novoPaciente = await Paciente.create(req.body);
        res.status(201).json(novoPaciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o paciente.' });
    }
};

// Atualizar um paciente
exports.atualizarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Paciente.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const pacienteAtualizado = await Paciente.findByPk(id);
            res.status(200).json(pacienteAtualizado);
        } else {
            res.status(404).json({ message: 'Paciente não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o paciente.' });
    }
};

// Excluir um paciente
exports.excluirPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Paciente.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Paciente não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o paciente.' });
    }
};

module.exports = exports;