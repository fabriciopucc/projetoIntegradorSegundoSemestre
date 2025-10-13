import express from 'express';

//Cor's
import cors from 'cors';

//Routers
import alunoRouter from './src/routes/AlunoRouter.js';
import publicacaoRouter from './src/routes/PublicacaoRouter.js';

const app = express();

//Configuração porta
app.listen(3000);

//Configuração de tipo de dado das requisições (JSON)
app.use(express.json());

//Configuração de COR's
app.use(cors({
    origin: "*"
}));

//Rotas
app.use("/alunos", alunoRouter);
app.use("/publicacoes", publicacaoRouter);