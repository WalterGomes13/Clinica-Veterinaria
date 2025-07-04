const db = require('../db');

class consultaDAO{
    //selecionar consulta
    async selectConsulta(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM consulta`);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar consultas:", error);
        throw error;
      }
    }
    
    //selecionar consulta de acordo com email e id do tutor
    async selectConsultaTutor(email) {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`
          SELECT c.*, a.nome_animal, s.numero_sala, v.nome AS nome_veterinario FROM consulta c
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
        console.error("Erro ao selecionar consulta:", error);
        throw error;
      }
    }
    
    //agendar consulta
    async agendarConsulta(consulta) {
      try {
        const conn = await db.connect();
        const sql = 'INSERT INTO consulta(id_animal, id_sala, data_hora, id_veterinario, status_consulta, sintomas) VALUES (?,?,?,?,?,?);';
        const values = [consulta.id_animal, consulta.id_sala, consulta.data_hora, consulta.id_veterinario, consulta.status_consulta, consulta.sintomas];
        return await conn.query(sql, values);
      } catch (error) {
        console.error("Erro ao agendar consulta:", error);
        throw error;
      }
    }
    
    //remarcar consulta
    async remarcarConsulta(data_hora, id_consulta) {
      try {
        const conn = await db.connect();
        const [result] = await conn.query(`UPDATE consulta SET data_hora = ? WHERE id_consulta = ?`, [data_hora, id_consulta]);
    
        if (result.affectedRows === 0) {
          throw new Error("Reserva não encontrada.");
        }
    
        return { mensagem: "Consulta remarcada com sucesso." };
      } catch (error) {
        console.error("Erro ao remarcar consulta:", error);
        throw error;
      }
    }
    
    //cancelar consulta
    async cancelarConsulta(id_consulta) {
      try {
        const conn = await db.connect();
        const [result] = await conn.query(`DELETE FROM consulta WHERE id_consulta = ?`, [id_consulta]);
    
        if (result.affectedRows === 0) {
          throw new Error("Consulta não encontrada.");
        }
    
        return { mensagem: "Consulta cancelada com sucesso." };
      } catch (error) {
        console.error("Erro ao cancelar consulta:", error);
        throw error;
      }
    }
}

module.exports = new consultaDAO();