import { Router } from "express" 
import AlunoController from "../controller/AlunoController.js";

const alunoRouter = Router();

alunoRouter.get("", AlunoController.listarAlunos);
alunoRouter.post("", AlunoController.salvarAluno);
alunoRouter.delete("/:codigo", AlunoController.excluirAlunoPorCodigo);

export default alunoRouter;
