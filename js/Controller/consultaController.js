const consultaDAO = require('../DAO/consultaDAO');

class consultaController{
    async buscarConsultasPorTutor(req, res) {
        const emailLogado = req.params.email;
        try {
            const consultas = await consultaDAO.selectConsultaTutor(emailLogado);
            res.json(consultas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar consultas' });
        }
    }   
    
    async marcarConsulta(req, res) {
        const novaConsulta = req.body;
        try {
            await consultaDAO.agendarConsulta(novaConsulta);
            res.status(201).json({ mensagem: "Consulta agendada com sucesso" });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao marcar consulta' });
        }
    } 

    async remarcarConsulta(req, res){
        const idConsulta = req.params.id;
        const { data_hora } = req.body;
        try {
            if (!data_hora) {
                    return res.status(400).json({ error: "Campo 'data_hora' é obrigatório." });
                }
            
            const resultado = await consultaDAO.remarcarConsulta(data_hora, idConsulta);
            res.status(200).json(resultado);
        } catch (error) {
            console.error("Erro na rota /consultas/:id:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async cancelarConsulta(req, res){
        const { id }  = req.params;
        try {
            await consultaDAO.cancelarConsulta(id); 
            res.status(200).json({ mensagem: "Consulta excluída com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar Consulta:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new consultaController();