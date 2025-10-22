import { Router } from 'express';
import LivroController from '../controller/LivroController.js'

const livroRouter = Router();

livroRouter.get("", LivroController.listarLivros);
livroRouter.get("/disponiveis", LivroController.listarLivrosDisponiveis);
livroRouter.get("/:codigo", LivroController.buscarLivroPorCodigo);
livroRouter.post("", LivroController.salvarLivro);
livroRouter.put("/:codigo", LivroController.atualizarLivro);
livroRouter.delete("/:codigo", LivroController.excluirLivroPorCodigo);

export default livroRouter;