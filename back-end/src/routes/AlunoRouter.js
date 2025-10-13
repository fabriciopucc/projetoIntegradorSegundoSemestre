import { Router } from "express" 
import AlunoController from "../controller/AlunoController.js";

const alunoRouter = Router();

alunoRouter.get("", AlunoController.listarAlunos);
alunoRouter.get("/ordemDePontuacao", AlunoController.listarAlunosPorOrdemDePontuacao);
alunoRouter.get("/:codigo", AlunoController.buscarAlunoPeloCodigo);
alunoRouter.get("/ra/:ra", AlunoController.buscarAlunoPeloRA);
alunoRouter.post("", AlunoController.salvarAluno);
alunoRouter.delete("/:codigo", AlunoController.excluirAlunoPorCodigo);

export default alunoRouter;
