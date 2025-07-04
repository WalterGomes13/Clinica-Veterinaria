const express = require('express');
const router = express.Router();
const animalController = require('../Controller/animalController');

// GET - Buscar animais por e-mail do tutor
router.get('/:email', animalController.buscarAnimaisPorTutor);

// POST - Cadastrar novo animal
router.post('/', animalController.cadastrarAnimal);

module.exports = router;