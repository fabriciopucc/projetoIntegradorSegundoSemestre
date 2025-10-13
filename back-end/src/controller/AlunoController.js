import AlunoRepository from "../repositories/AlunoRepository.js";

class AlunoController{
  
  async listarAlunos(req, res) {
    const retorno = await AlunoRepository.listarAlunos();
    res.json(retorno);
  }

  async listarAlunosPorOrdemDePontuacao(req, res) {
    const retorno = await AlunoRepository.listarAlunosPorOrdemDePontuacao();
    res.json(retorno);
  }

   async buscarAlunoPeloCodigo(req, res) {
    const codigo = req.params.codigo;
    const retorno = await AlunoRepository.buscarAlunoPeloCodigo(codigo);
    res.json(retorno);
  }

  async buscarAlunoPeloRA(req, res) {
    const ra = req.params.ra;
    const retorno = await AlunoRepository.buscarAlunoPeloRA(ra);
    res.json(retorno);
  }

  async salvarAluno(req, res){
    const aluno = req.body;
    const retorno = await AlunoRepository.salvarAluno(aluno);
    res.json(retorno);
  }

  async excluirAlunoPorCodigo(req, res){
    const codigo = req.params.codigo;
    const retorno = await AlunoRepository.excluirAlunoPorCodigo(codigo);
    res.json(retorno);
  }
}

export default new AlunoController;