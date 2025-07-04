const cirurgiaDAO = require('../DAO/cirurgiaDAO');

class cirurgiaController{
    async buscarCirurgiasPorTutor(req, res) {
        const emailLogado = req.params.email;
        try {
          const cirurgias = await cirurgiaDAO.selectCirurgiaTutor(emailLogado);
          res.json(cirurgias);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao buscar cirurgias' });
        }
      }

    async marcarCirurgia(req, res) {
        const novaCirurgia = req.body;
        try {
        await cirurgiaDAO.agendarCirurgia(novaCirurgia);
        res.status(201).json({ mensagem: "Cirurgia agendada com sucesso" });
        } catch (error) {
        res.status(500).json({ error: 'Erro ao marcar cirurgia' });
        }
       } 

    async remarcarCirurgia(req, res){
        const idCirurgia = req.params.id;
        const { data_hora } = req.body;
        try {
            if (!data_hora) {
                  return res.status(400).json({ error: "Campo 'data_hora' é obrigatório." });
                }
            
            const resultado = await cirurgiaDAO.remarcarCirurgia(data_hora, idCirurgia);
            res.status(200).json(resultado);
        } catch (error) {
            console.error("Erro na rota /cirurgias/:id:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async cancelarCirurgia(req, res){
        const { id }  = req.params;
        try {
            await cirurgiaDAO.cancelarCirurgia(id); 
            res.status(200).json({ mensagem: "Cirurgia excluída com sucesso" });
          } catch (error) {
            console.error("Erro ao deletar cirurgia:", error.message);
            res.status(500).json({ error: error.message });
          }
    }
}

module.exports = new cirurgiaController();