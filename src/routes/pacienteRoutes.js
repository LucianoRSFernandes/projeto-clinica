const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/pacientes', pacienteController.listarPacientes);
router.get('/pacientes/:id', pacienteController.obterPacientePorId);
router.post('/pacientes', pacienteController.criarPaciente);
router.put('/pacientes/:id', pacienteController.atualizarPaciente);
router.delete('/pacientes/:id', pacienteController.excluirPaciente);

module.exports = router;