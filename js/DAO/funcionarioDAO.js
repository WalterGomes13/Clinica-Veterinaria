const db = require('../db');

class funcionarioDAO{
    //selecionar funcionarios
    async selectFuncionarios(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM funcionario`);
        return rows;
      } catch (error) {
        console.error("Erro ao exibir funcionarios:", error);
        throw error;
      }
    }
    
    //selecionar funcionarios com condição
    async selectWhereFuncionario(selecao = "*", campo, valor) {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM funcionario WHERE ${campo} = ?`, [valor]);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar funcionarios:", error);
        throw error;
      }
    }
    
    //contratar funcionarios
    async insertFuncionario(funcionario) {
      try {
        const conn = await db.connect();
        const sql = 'INSERT INTO funcionario(nome, telefone, email, cargo, turno) VALUES (?, ?, ?, ?, ?);';
        const values = [funcionario.nome, funcionario.telefone, funcionario.email, funcionario.cargo, funcionario.turno];
        const [result] = await conn.query(sql, values); // destrutura para pegar insertId
        return result.insertId; // retorna o ID do funcionário recém-criado
      } catch (error) {
        console.error("Erro ao contratar funcionários:", error);
        throw error;
      }
    }
    
    //remover funcionarios
    async removerFuncionario(id_funcionario) {
      try {
        const conn = await db.connect();
        const [result] = await conn.query(`DELETE FROM funcionario WHERE id_funcionario = ?`, [id_funcionario]);
    
        if (result.affectedRows === 0) {
          throw new Error("Funcionario não encontrado.");
        }
    
        return { mensagem: "Funcionário removido com sucesso." };
      } catch (error) {
        console.error("Erro ao remover funcionário:", error);
        throw error;
      }
    }
}

module.exports = new funcionarioDAO();