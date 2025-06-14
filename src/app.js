const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database/database');
const db = require('./models');

const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const planoSaudeRoutes = require('./routes/planoSaudeRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const relatorioFinanceiroRoutes = require('./routes/relatorioFinanceiroRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const receitaMedicaRoutes = require('./routes/receitaMedicaRoutes');

const app = express();
app.use(bodyParser.json());

app.use(planoSaudeRoutes);
app.use(pacienteRoutes);
app.use(medicoRoutes);
app.use(consultaRoutes);
app.use(pagamentoRoutes);
app.use('/api', relatorioFinanceiroRoutes);
app.use('/api', receitaMedicaRoutes);

async function sincronizarBanco() {
    try {
        await database.sync();
        console.log('Banco de dados sincronizado (sincronização padrão)');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

sincronizarBanco();

module.exports = app;