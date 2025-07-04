const tutorDAO = require('../DAO/tutorDAO');

class tutorController{
    async buscarTutorPorEmail(req, res){
        const email = req.params.email;
        try {
            const tutores = await tutorDAO.selectWhereTutor("*", "email", email);
            res.json(tutores);
          } catch (error) {
            res.status(500).json({ error: "Erro ao buscar tutores" });
          }
    }

    async cadastrarTutor(req, res){
        const novoTutor = req.body;
        try {
            console.log(">>>> Dados recebidos:", novoTutor);
            await tutorDAO.insertTutor(novoTutor);
        
            res.status(201).json({ mensagem: "Tutor cadastrado com sucesso" });
          } catch (error) {
            console.error("ERRO DETALHADO >>>", error.message, error.stack);
            res.status(500).json({ error: error.message });
          }
    }
}

module.exports = new tutorController();