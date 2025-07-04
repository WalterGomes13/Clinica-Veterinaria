const db = require('../db');

class estoqueDAO{
    //visualizar estoque
    async verEstoque(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM estoque`);
        return rows;
      } catch (error) {
        console.error("Erro ao visualizar estoque:", error);
        throw error;
      }
    }
    
    //movimentar estoque
    async movimentarEstoque(produto) {
      try {
        const conn = await db.connect();
        const sql = `INSERT INTO movimentacaoestoque(id_funcionario, id_item, tipo_mov, quantidade, data_hora) VALUES (?, ?, ?, ?, ?);`;
        const values = [produto.id_funcionario, produto.id_item, produto.tipo_mov, produto.quantidade, produto.data_hora];
    
        const [rows] = await conn.query(`SELECT quantidade FROM estoque WHERE id_item = ?`, [produto.id_item]);
        const qtdAtual = rows[0]?.quantidade ?? 0;
    
        let novaQtd;
        if (produto.tipo_mov === 'compra') {
          novaQtd = Number(qtdAtual) + Number(produto.quantidade);
        } else if (produto.tipo_mov === 'venda') {
          novaQtd = qtdAtual - produto.quantidade;
          if (novaQtd < 0) {
            throw new Error('Estoque insuficiente para a venda.');
          }
        } else {
          throw new Error('Tipo de movimentação inválido.');
        }
    
        await conn.query(`UPDATE estoque SET quantidade = ? WHERE id_item = ?`, [novaQtd, produto.id_item]);
        return await conn.query(sql, values);
      } catch (error) {
        console.error("Erro ao movimentar estoque:", error);
        throw error;
      }
    }
}

module.exports = new estoqueDAO();