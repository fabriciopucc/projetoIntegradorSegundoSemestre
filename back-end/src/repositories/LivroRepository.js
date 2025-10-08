import { consulta } from "../database/conexao.js";

class LivroRepository{

  listarLivros(){
    const query = "select * from livros;"
    return consulta(query, 'Não foi possível listar!')  
  }

  buscarLivroPorCodigo(codigo){
    const query = "select * from livros where codigo = ?;"
    return consulta(query, codigo, 'Nenhum livro possui este código') ;
  }

  salvarLivro(livro){
    const query = "insert into livros set ?;";
    return consulta(query, livro, 'Não foi possível salvar');
  }

  atualizarLivro(livro, codigo){
    const query = "update livros set ? where codigo = ?";
    return consulta(query, [livro, codigo], 'Não foi possível atualizar livro');
  }

  excluirLivro(codigo){
    const query = "delete from livros where codigo = ?;"
    return consulta(query, codigo, 'Não foi possível excluir')  
  }

}

export default new LivroRepository;