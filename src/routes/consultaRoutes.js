const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/consultas', consultaController.listarConsultas);
router.get('/consultas/:id', consultaController.obterConsultaPorId);
router.post('/consultas', consultaController.criarConsulta);
router.put('/consultas/:id', consultaController.atualizarConsulta);
router.delete('/consultas/:id', consultaController.excluirConsulta);

// Nova rota para buscar agendamentos com plano válido
router.get('/agendamentos/planos-validos', consultaController.listarAgendamentosComPlanoValido);

module.exports = router;