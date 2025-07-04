const db = require('../db');

class veterinarioDAO{
    //selecionar veterinario
    async selectVeterinarios(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(
          `SELECT f.${selecao}, v.especialidade 
          FROM funcionario f
          LEFT JOIN veterinario v 
          ON f.id_funcionario = v.id_veterinario
          WHERE cargo = 'veterinario'`
        );
        return rows;
      } catch (error) {
        console.error("Erro ao exibir veterinarios:", error);
        throw error;
      }
    }
    
    //contratar veterinarios
    async insertVeterinario(id_funcionario, especialidade) {
      try {
        const conn = await db.connect();
        const sql = 'INSERT INTO veterinario(id_veterinario, especialidade) VALUES (?, ?);';
        const values = [id_funcionario, especialidade];
        return await conn.query(sql, values);
      } catch (error) {
        console.error("Erro ao contratar veterinário:", error);
        throw error;
      }
    }
    
    
    //selecionar veterinarios por especialidade
    async selectVetEspecialidade(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(
          `SELECT f.${selecao}, v.especialidade 
          FROM funcionario f
          LEFT JOIN veterinario v 
          ON f.id_funcionario = v.id_veterinario
          WHERE cargo = 'veterinario'
          `);
        return rows;
      } catch (error) {
        console.error("Erro ao exibir veterinarios:", error);
        throw error;
      }
    }
}

module.exports = new veterinarioDAO();