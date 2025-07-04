const animalDAO = require('../DAO/animalDAO');

class animalController{
    async buscarAnimaisPorTutor(req, res) {
    const emailLogado = req.params.email;
    try {
      const animais = await animalDAO.selectAnimalTutor("*", emailLogado);
      res.json(animais);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar animais' });
    }
  }

  async cadastrarAnimal(req, res) {
    const novoAnimal = req.body;
    try {
      await animalDAO.insertAnimais(novoAnimal);
      res.status(201).json({ message: 'Animal cadastrado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar animal' });
    }
  }
}

module.exports = new animalController();