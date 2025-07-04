const estoqueDAO = require('../DAO/estoqueDAO');

class estoqueController{
    async buscarProdutos(req, res){
        try {
            const estoque = await estoqueDAO.verEstoque("*");
            res.json(estoque);
          } catch (error) {
            res.status(500).json({ error: "Erro ao buscar estoque" });
          }
    }

    async movimentarEstoque(req, res){
        const novaMovimentacao = req.body;
        try {
            console.log(">>>> Dados recebidos:", novaMovimentacao);
            await estoqueDAO.movimentarEstoque(novaMovimentacao);
            res.status(201).json({ mensagem: "Estoque movimentado com sucesso" });
          } catch (error) {
            console.error("ERRO DETALHADO >>>", error.message, error.stack);
            res.status(500).json({ error: error.message });
          }
    }
}

module.exports = new estoqueController();