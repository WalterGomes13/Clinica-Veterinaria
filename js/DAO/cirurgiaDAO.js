const db = require('../db');

class cirurgiaDAO{
    //selecionar cirurgia
    async selectCirurgia(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM cirurgia`);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar cirurgias:", error);
        throw error;
      }
    }
    
    //selecionar cirurgia de acordo com email e id do tutor
    async selectCirurgiaTutor(email) {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`
          SELECT c.*, a.nome_animal, s.numero_sala, v.nome AS nome_veterinario FROM cirurgia c
          INNER JOIN animal a ON
          c.id_animal = a.id_animal
          INNER JOIN tutor t ON
          a.id_tutor = t.id_tutor
          INNER JOIN sala s ON
          s.id_sala = c.id_sala
          INNER JOIN funcionario v ON
          c.id_veterinario = v.id_funcionario
          WHERE t.email = ?;
          `, [email]
        );
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar cirurgia:", error);
        throw error;
      }
    }
    
    //agendar cirurgia
    async agendarCirurgia(cirurgia) {
      try {
        const conn = await db.connect();
        const sql = 'INSERT INTO cirurgia(id_animal, id_sala, data_hora, id_veterinario, status_cirurgia, motivo_cirurgia) VALUES (?,?,?,?,?,?);';
        const values = [cirurgia.id_animal, cirurgia.id_sala, cirurgia.data_hora, cirurgia.id_veterinario, cirurgia.status_cirurgia, cirurgia.motivo_cirurgia];
        return await conn.query(sql, values);
      } catch (error) {
        console.error("Erro ao agendar cirurgia:", error);
        throw error;
      }
    }
    
    //remarcar cirurgia
    async remarcarCirurgia(data_hora, id_cirurgia) {
      try {
        const conn = await db.connect();
        const [result] = await conn.query(`UPDATE cirurgia SET data_hora = ? WHERE id_cirurgia = ?`, [data_hora, id_cirurgia]);
    
        if (result.affectedRows === 0) {
          throw new Error("Reserva não encontrada.");
        }
    
        return { mensagem: "Cirurgia remarcada com sucesso." };
      } catch (error) {
        console.error("Erro ao remarcar cirurgia:", error);
        throw error;
      }
    }
    
    //cancelar cirurgia
    async cancelarCirurgia(id_cirurgia) {
      try {
        const conn = await db.connect();
        const [result] = await conn.query(`DELETE FROM cirurgia WHERE id_cirurgia = ?`, [id_cirurgia]);
    
        if (result.affectedRows === 0) {
          throw new Error("Cirurgia não encontrada.");
        }
    
        return { mensagem: "Cirurgia cancelada com sucesso." };
      } catch (error) {
        console.error("Erro ao cancelar cirurgia:", error);
        throw error;
      }
    }
}

module.exports = new cirurgiaDAO();