import { Router } from 'express';
import LivroController from '../controller/LivroController.js';

const routerLivros = Router();

routerLivros.get("", LivroController.listarLivros);
routerLivros.get("/:codigo", LivroController.buscarLivroPorCodigo);
routerLivros.post("", LivroController.salvarLivro);
routerLivros.put("/:codigo", LivroController.atualizarLivro);
routerLivros.delete("/:codigo", LivroController.excluirLivro);

export default routerLivros;