const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');

router.get('/medicos', medicoController.listarMedicos);
router.get('/medicos/:id', medicoController.obterMedicoPorId);
router.post('/medicos', medicoController.criarMedico);
router.put('/medicos/:id', medicoController.atualizarMedico);
router.delete('/medicos/:id', medicoController.excluirMedico);

module.exports = router;