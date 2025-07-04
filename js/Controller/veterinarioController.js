const veterinarioDAO = require('../DAO/veterinarioDAO');

class veterinarioController{
    async buscarVeterinario(req, res){
        try {
            const veterinarios = await veterinarioDAO.selectVetEspecialidade("*");
            res.json(veterinarios);
          } catch (error) {
            res.status(500).json({ error: "Erro ao buscar veterinarios" });
          }
    }
}

module.exports = new veterinarioController();