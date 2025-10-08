import express from 'express';
import cors from 'cors';
import routerLivros from './src/routes/routesLivros.js';
import alunoRouter from './src/routes/AlunoRouter.js';

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
app.use("/livros", routerLivros);
app.use("/alunos", alunoRouter);