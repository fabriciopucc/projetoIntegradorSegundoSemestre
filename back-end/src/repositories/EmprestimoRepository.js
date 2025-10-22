import { consulta } from "../database/conexao.js";

class EmprestimoRepository{pub

  listarEmprestimos(){
    const query = "select * from emprestimos";
    return consulta(query, "Não foi possível executar a consulta!");
  }

  listarLivrosNaoDevolvidosDeUmAlunoPeloSeuCodigo(codigoAluno){
    const query = "select l.codigo as codigo, l.titulo as titulo from alunos a  inner join emprestimos e on a.codigo = e.fk_codigo_aluno inner join livros l on l.codigo = e.fk_codigo_livro where a.codigo = ? and e.devolvido = false";
    return consulta(query, codigoAluno, "Não foi possível executar a consulta!");
  }

  buscarEmprestimoPeloCodigo(codigo){
    const query = "select * from emprestimos where codigo = ?";
    return consulta(query, codigo, "Não foi possível executar a consulta!");
  }

  buscarCodigoDeUmEmprestimoNaoDevolvidoPeloCodigoDoAlunoELivro(codigoAluno, codigoLivro){
    const query = "select e.codigo as codigo_emprestimo from alunos a inner join emprestimos e on a.codigo = e.fk_codigo_aluno inner join livros l on l.codigo = e.fk_codigo_livro where a.codigo = ? and l.codigo = ? and e.devolvido = false limit 1;";
    return consulta(query, [codigoAluno, codigoLivro], "Não foi possível executar a consulta!");
  }

  buscarSeCertoAlunoEstaComAPosseDeCertoLivroPeloCodigoDoAlunoEDoLivro(codigoAluno, codigoLivro){
    const query = "select count(l.codigo) as quantidade from alunos a inner join emprestimos e on a.codigo = e.fk_codigo_aluno inner join livros l on l.codigo = e.fk_codigo_livro where a.codigo = ? and l.codigo = ? and e.devolvido = false;"
    return consulta(query, [codigoAluno, codigoLivro], "Não foi possível executar a consulta!");
  }

  salvarUmEmprestimo(emprestimo){
    const query = "insert into emprestimos set ?;";
    return consulta(query, emprestimo, 'Não foi possível salvar!');
  }

  atualizarEmprestimoComoDevolvido(codigo){
    const query = "update emprestimos set devolvido = true where codigo = ?;";
    return consulta(query, codigo, 'Não foi possível atualizar status!');
  }
};

export default new EmprestimoRepository;