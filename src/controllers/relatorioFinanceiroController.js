const { sequelize } = require('../models');
const Consulta = sequelize.models.Consulta;
const Pagamento = sequelize.models.Pagamento;
const RelatorioFinanceiro = sequelize.models.RelatorioFinanceiro;
const { getMonthYear } = require('../utils/dateUtils');
const { Op } = require('sequelize');

// Gerar resumo financeiro com filtro por período
exports.gerarResumoFinanceiro = async (req, res) => {
    console.log('Rota de resumo financeiro acessada com filtros:', req.query);
    const { periodo } = req.query;
    let dataInicio;
    let dataFim;

    // Definir período de filtro com base no parâmetro 'periodo'
    const hoje = new Date();
    const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0);
    const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59);
    const inicioDaSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));
    inicioDaSemana.setHours(0, 0, 0, 0);
    const fimDaSemana = new Date(hoje.setDate(hoje.getDate() + 6));
    fimDaSemana.setHours(23, 59, 59, 999);
    const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1, 0, 0, 0);
    const fimDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59, 999);

    switch (periodo) {
        case 'diario':
            dataInicio = inicioDoDia;
            dataFim = fimDoDia;
            break;
        case 'semanal':
            dataInicio = new Date(inicioDaSemana);
            dataFim = new Date(fimDaSemana);
            break;
        case 'mensal':
            dataInicio = inicioDoMes;
            dataFim = fimDoMes;
            break;
        default:
            break;
    }

    try {
        const consultas = await Consulta.findAll({
            include: [{
                model: Pagamento,
                as: 'pagamento',
                where: dataInicio && dataFim ? {
                    dataPagamento: {
                        [Op.gte]: dataInicio,
                        [Op.lte]: dataFim,
                        [Op.ne]: null
                    }
                } : {
                    dataPagamento: {
                        [Op.ne]: null
                    }
                }
            }],
            order: [['data', 'ASC']],
        });

        const resumo = [];
        let valorTotalPeriodo = 0;

        consultas.forEach(consulta => {
            if (consulta.Pagamento && consulta.Pagamento.dataPagamento) {
                valorTotalPeriodo += consulta.valor;
                resumo.push({
                    consultaId: consulta.id,
                    dataConsulta: consulta.data,
                    valorConsulta: consulta.valor,
                    dataPagamento: consulta.Pagamento.dataPagamento,
                    valorPago: consulta.valor,
                });
            }
        });

        res.status(200).json({
            periodo: periodo || 'todos',
            totalPagamentos: resumo.length,
            valorTotalPagoNoPeriodo: valorTotalPeriodo.toFixed(2),
            detalhes: resumo,
        });

    } catch (error) {
        console.error('Erro ao gerar resumo financeiro:', error);
        res.status(500).json({ message: 'Erro ao gerar resumo financeiro', error: error.message });
    }
};

// Criar um novo RelatorioFinanceiro
exports.criarRelatorioFinanceiro = async (req, res) => {
    console.log('Rota de criar relatório financeiro acessada!');
    try {
        const novoRelatorio = await RelatorioFinanceiro.create(req.body);
        res.status(201).json(novoRelatorio);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar relatório financeiro', error: error.message });
    }
};

// Obter um RelatorioFinanceiro por ID
exports.obterRelatorioFinanceiroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const relatorio = await RelatorioFinanceiro.findByPk(id);
        if (relatorio) {
            res.status(200).json(relatorio);
        } else {
            res.status(404).json({ message: 'Relatório financeiro não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar relatório financeiro', error: error.message });
    }
};

// Listar todos os RelatoriosFinanceiros
exports.listarTodosRelatoriosFinanceiros = async (req, res) => {
    console.log('*** ROTA DE LISTAR RELATÓRIOS FINANCEIROS ACESSADA! ***');
    try {
        const relatorios = await RelatorioFinanceiro.findAll();
        res.status(200).json(relatorios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar relatórios financeiros', error: error.message });
    }
};

// Atualizar um RelatorioFinanceiro
exports.atualizarRelatorioFinanceiro = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await RelatorioFinanceiro.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const relatorioAtualizado = await RelatorioFinanceiro.findByPk(id);
            res.status(200).json(relatorioAtualizado);
        } else {
            res.status(404).json({ message: 'Relatório financeiro não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o relatório financeiro.', error: error.message });
    }
};

// Excluir um RelatorioFinanceiro
exports.excluirRelatorioFinanceiro = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await RelatorioFinanceiro.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Relatório financeiro não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o relatório financeiro.', error: error.message });
    }
};

module.exports = exports;