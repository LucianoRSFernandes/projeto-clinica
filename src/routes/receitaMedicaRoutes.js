const express = require('express');
const router = express.Router();
const receitaMedicaController = require('../controllers/receitaMedicaController');

router.get('/', receitaMedicaController.listarReceitasMedicas);
router.get('/buscar/:id', receitaMedicaController.obterReceitaMedicaPorId);
router.post('/', receitaMedicaController.criarReceitaMedica);
router.put('/:id', receitaMedicaController.atualizarReceitaMedica);
router.delete('/:id', receitaMedicaController.excluirReceitaMedica);

module.exports = router;