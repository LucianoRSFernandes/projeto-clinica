const express = require('express');
const router = express.Router();
const planoSaudeController = require('../controllers/planoSaudeController');

router.get('/planos-saude', planoSaudeController.listarPlanosSaude);
router.get('/planos-saude/:id', planoSaudeController.obterPlanoSaudePorId);
router.post('/planos-saude', planoSaudeController.criarPlanoSaude);
router.put('/planos-saude/:id', planoSaudeController.atualizarPlanoSaude);
router.delete('/planos-saude/:id', planoSaudeController.excluirPlanoSaude);

module.exports = router;