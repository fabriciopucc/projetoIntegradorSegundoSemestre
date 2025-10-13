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

  salvarAluno(aluno){
    const query = "insert into alunos set ?;";
    return consulta(query, aluno, 'Não foi possível salvar!');
  }

  excluirAlunoPorCodigo(codigo){
    const query = "delete from alunos where codigo = ?";
    return consulta(query, codigo, "Não foi possível excluir este aluno!");
  }

}

export default new AlunoRepository;