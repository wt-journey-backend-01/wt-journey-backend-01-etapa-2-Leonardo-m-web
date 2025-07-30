const express = require('express');
const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');
const errorHandler = require('./utils/errorHandler')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(errorHandler);

app.use('/agentes', agentesRouter);
app.use('/casos', casosRouter);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});