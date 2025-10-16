import { Router } from "express";
import EmprestimoController from "../controller/EmprestimoController.js";

const emprestimoRouter = Router();

emprestimoRouter.get("", EmprestimoController.listarEmprestimos);
emprestimoRouter.get("/:codigoAluno", EmprestimoController.listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo);
emprestimoRouter.post("", EmprestimoController.salvarEmprestimo);
emprestimoRouter.put("", EmprestimoController.devolverEmprestimo);

export default emprestimoRouter;