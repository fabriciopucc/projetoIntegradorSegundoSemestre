import { consulta } from "../database/conexao.js";

class LivroRepository{

  listarLivros(){
    const query = "select * from livros;";
    return consulta(query, 'Não foi possível listar!');  
  }

  listarLivrosDisponiveis(){
    const query = "select * from livros where quantidade_exemplares > 0;";
    return consulta(query, 'Não foi possível listar!');
  }

  buscarLivroPorCodigo(codigo){
    const query = "select * from livros where codigo = ?;";
    return consulta(query, codigo, 'Nenhum livro possui este código!');
  }

  buscarLivroPelaEtiqueta(etiqueta){
    const query = "select * from livros where etiqueta = ?;";
    return consulta(query, etiqueta, 'Nenhum livro possui esta etiqueta!');
  }

  buscarLivroPeloISBN(isbn){
    const query = "select * from livros where isbn = ?;";
    return consulta(query, isbn, 'Nenhum livro possui este ISBN!');
  }

  salvarLivro(livro){
    const query = "insert into livros set ?;";
    return consulta(query, livro, 'Não foi possível salvar!');
  }

  atualizarLivro(livro, codigo){
    const query = "update livros set ? where codigo = ?";
    return consulta(query, [livro, codigo], 'Não foi possível atualizar!');
  }

  atualizarQuantidadeDeExemplaresDoLivro(quantidadeAtual, codigo){
    const query = "update livros set quantidade_exemplares = ? where codigo = ?";
    return consulta(query, [quantidadeAtual, codigo], 'Não foi possível atualizar!');
  }

  excluirLivroPorCodigo(codigo){
    const query = "delete from livros where codigo = ?;";
    return consulta(query, codigo, 'Não foi possível excluir!');
  }
}

export default new LivroRepository;