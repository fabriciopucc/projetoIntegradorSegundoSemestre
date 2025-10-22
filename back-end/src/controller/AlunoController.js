import AlunoRepository from "../repositories/AlunoRepository.js";

class AlunoController{
  
  async listarAlunos(req, res) {
    const retorno = await AlunoRepository.listarAlunos();
    res.status(200).json(retorno);
  }

  async listarAlunosPorOrdemDePontuacao(req, res) {
    const retorno = await AlunoRepository.listarAlunosPorOrdemDePontuacao();
    res.status(200).json(retorno);
  }

   async buscarAlunoPeloCodigo(req, res) {
    const codigo = req.params.codigo;
    const retorno = await AlunoRepository.buscarAlunoPeloCodigo(codigo);
    res.status(200).json(retorno);
  }

  async buscarAlunoPeloRA(req, res) {
    let retorno = "Aluno inexistente!";
    let status = 400;

    const ra = req.params.ra;
    const buscaPeloRA = await AlunoRepository.buscarAlunoPeloRA(ra);

    if(buscaPeloRA.length){
      retorno = await AlunoRepository.buscarAlunoPeloRA(ra);
      status = 200;
    }

    res.status(status).json(retorno);
  }

  async salvarAluno(req, res){
    let retorno = "Aluno salvo com sucesso!";
    let status = 400;

    const aluno = req.body;
    const buscaPeloRA = await AlunoRepository.buscarAlunoPeloRA(aluno.ra);
    const buscaPeloCPF = await AlunoRepository.buscarAlunoPeloCPF(aluno.cpf);

    if(buscaPeloRA.length){
      retorno = "Desculpe, este RA já foi cadastrado!";
    }
    else if(buscaPeloCPF.length){
      retorno = "Este CPF já foi cadastrado!";
    }
    else{
      await AlunoRepository.salvarAluno(aluno);
      status = 201;
    }

    res.status(status).json(retorno);
  }

  async excluirAlunoPorCodigo(req, res){
    let retorno = "Aluno excluído com sucesso!";
    let status = 400;

    const codigo = req.params.codigo;

    const buscaPeloCodigo = await AlunoRepository.buscarAlunoPeloCodigo(codigo);

    if(buscaPeloCodigo.length){
      await AlunoRepository.excluirAlunoPorCodigo(codigo);
      status = 200;
    }
    else{
      retorno = "Aluno inexistente"; 
    }

    res.status(status).json(retorno);
  }
}

export default new AlunoController;