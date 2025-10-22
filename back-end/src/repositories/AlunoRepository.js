import {consulta} from '../database/conexao.js';

class AlunoRepository{

  listarAlunos(){
    const query = "select * from alunos;";
    return consulta(query, 'Não foi possível listar!')  
  }

  listarAlunosPorOrdemDePontuacao(){
    const query = "select * from alunos order by pontuacao desc";
    return consulta(query, "Não foi possível retornar o ranking!");
  }

  buscarAlunoPeloCodigo(codigo){
    const query = "select * from alunos where codigo = ?";
    return consulta(query, codigo, "Aluno inexistente");
  }

  buscarAlunoPeloRA(ra){
    const query = "select * from alunos where ra = ?";
    return consulta(query, ra, "Aluno inexistente");
  }

  buscarAlunoPeloCPF(cpf){
    const query = "select * from alunos where cpf = ?";
    return consulta(query, cpf, "Aluno inexistente");
  }

  buscarAlunoPeloRA(ra){
    const query = "select * from alunos where ra = ?";
    return consulta(query, ra, "Aluno inexistente");
  }

  salvarAluno(aluno){
    const query = "insert into alunos set ?;";
    return consulta(query, aluno, 'Não foi possível salvar!');
  }

  atualizarPontuacaoDoAluno(pontuacaoAtual, codigo){
    const query = "update alunos set pontuacao = ? where codigo = ?"
    return consulta(query, [pontuacaoAtual, codigo], 'Não foi possível atualizar!');
  }

  excluirAlunoPorCodigo(codigo){
    const query = "delete from alunos where codigo = ?";
    return consulta(query, codigo, "Não foi possível excluir este aluno!");
  }

}

export default new AlunoRepository;