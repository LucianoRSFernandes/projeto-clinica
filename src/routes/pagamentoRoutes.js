const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.get('/pagamentos', pagamentoController.listarPagamentos);
router.get('/pagamentos/:id', pagamentoController.obterPagamentoPorId);
router.post('/pagamentos', pagamentoController.criarPagamento);
router.put('/pagamentos/:id', pagamentoController.atualizarPagamento);
router.delete('/pagamentos/:id', pagamentoController.excluirPagamento);

module.exports = router;