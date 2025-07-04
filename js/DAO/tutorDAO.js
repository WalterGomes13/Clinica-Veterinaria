const db = require('../db');

class tutorDAO{
    //selecionar tutor
    async selectTutor(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM tutor`);
        return rows;
      } catch (error) {
        console.error("Erro ao exibir tutor:", error);
        throw error;
      }
    }
    
    //selecionar tutor com condição
    async selectWhereTutor(selecao = "*", campo, valor) {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM tutor WHERE ${campo} = ?`, [valor]);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar tutor com condição:", error);
        throw error;
      }
    }
    
    //inserir tutor
    async insertTutor(tutor) {
      try {
        const conn = await db.connect();
        const sql = 'INSERT INTO tutor(nome, telefone, email, senha) VALUES (?, ?, ?, ?);';
        const values = [tutor.nome, tutor.telefone, tutor.email, tutor.senha];
        return await conn.query(sql, values);
      } catch (error) {
        console.error("Erro ao inserir tutor:", error);
        throw error;
      }
    }
}

module.exports = new tutorDAO();