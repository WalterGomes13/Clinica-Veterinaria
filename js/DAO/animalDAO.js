const db = require('../db');

class animalDAO{
    
    //selecionar animais
    async selectAnimais(selecao = "*") {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM animal`);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar animais:", error);
        throw error;
      }
    }
    
    //selecionar animal com condição
    async selectWhereAnimais(selecao = "*", campo, valor) {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT ${selecao} FROM animal WHERE ${campo} = ?`, [valor]);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar animal", error);
        throw error;
      }
    }
    
    //buscar animal por tutor
    async selectAnimalTutor(selecao = "*", email_tutor) {
      try {
        const conn = await db.connect();
        const [rows] = await conn.query(`
          SELECT ${selecao} FROM animal
          INNER JOIN tutor
          ON animal.id_tutor = tutor.id_tutor 
          WHERE tutor.email = ?`, [email_tutor]);
        return rows;
      } catch (error) {
        console.error("Erro ao selecionar animal", error);
        throw error;
      }
    }
    
    //inserir animais
    async insertAnimais(animal) {
      try {
        const conn = await db.connect();
        const sql = 'INSERT INTO animal(nome_animal, especie, raca, idade, peso, sexo, id_tutor) VALUES (?,?,?,?,?,?,?);';
        const values = [animal.nome_animal, animal.especie, animal.raca, animal.idade, animal.peso, animal.sexo, animal.id_tutor];
        return await conn.query(sql, values);
      } catch (error) {
        console.error("Erro ao cadastrar animal:", error);
        throw error;
      }
    }
};

module.exports = new animalDAO();