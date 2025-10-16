import PublicacaoRepository from '../repositories/PublicacaoRepository.js';

class PublicacaoController {

  async listarPublicacoes(req, res) {
    const row = await PublicacaoRepository.listarPublicacoes();
    res.json(row);
  }

  async listarPublicacoesDisponiveis(req, res) {
    const row = await PublicacaoRepository.listarPublicacoesDisponiveis();
    res.json(row);
  }

  async buscarPublicacaoPorCodigo(req, res) {
    const codigo = req.params.codigo;
    const row = await PublicacaoRepository.buscarPublicacaoPorCodigo(codigo);
    res.json(row);
  }

  async salvarPublicacao(req, res) {
    const publicacao = req.body;
    const row = await PublicacaoRepository.salvarPublicacao(publicacao);
    res.json(row);
  }

  async atualizarPublicacao(req, res) {
    const publicacao = req.body;
    const codigo = req.params.codigo;
    const row = await PublicacaoRepository.atualizarPublicacao(publicacao, codigo);
    res.json(row);
  }

  async excluirPublicacao(req, res) {
    const codigo = req.params.codigo;
    const row = await PublicacaoRepository.excluirPublicacao(codigo);
    res.json(row);
  }
}

export default new PublicacaoController;