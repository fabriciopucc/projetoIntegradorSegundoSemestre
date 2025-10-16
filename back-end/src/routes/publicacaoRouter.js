import { Router } from 'express';
import PublicacaoController from '../controller/PublicacaoController.js';

const publicacaoRouter = Router();

publicacaoRouter.get("", PublicacaoController.listarPublicacoes);
publicacaoRouter.get("/disponiveis", PublicacaoController.listarPublicacoesDisponiveis);
publicacaoRouter.get("/:codigo", PublicacaoController.buscarPublicacaoPorCodigo);
publicacaoRouter.post("", PublicacaoController.salvarPublicacao);
publicacaoRouter.put("/:codigo", PublicacaoController.atualizarPublicacao);
publicacaoRouter.delete("/:codigo", PublicacaoController.excluirPublicacao);

export default publicacaoRouter;