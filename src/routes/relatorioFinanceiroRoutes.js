const express = require('express');
const router = express.Router();
const relatorioFinanceiroController = require('../controllers/relatorioFinanceiroController');

router.get('/', relatorioFinanceiroController.listarTodosRelatoriosFinanceiros);
router.get('/resumo', relatorioFinanceiroController.gerarResumoFinanceiro);
router.get('/buscar/:id', relatorioFinanceiroController.obterRelatorioFinanceiroPorId);
router.post('/', relatorioFinanceiroController.criarRelatorioFinanceiro);
router.put('/:id', relatorioFinanceiroController.atualizarRelatorioFinanceiro);
router.delete('/:id', relatorioFinanceiroController.excluirRelatorioFinanceiro);

module.exports = router;