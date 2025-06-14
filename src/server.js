const app = require('./app');

const port = 3000;

app.listen(port, () => {
    console.log('Iniciando o servidor...');
    console.log('Servidor configurado para escutar.');
    console.log(`Servidor rodando na porta ${port}`);
});