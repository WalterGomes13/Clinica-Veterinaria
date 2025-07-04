const express = require('express');
const router = express.Router();
const tutorController = require('../Controller/tutorController');

// GET - Buscar tutor por e-mail 
router.get('/:email', tutorController.buscarTutorPorEmail);

// POST - Cadastrar novo tutor
router.post('/', tutorController.cadastrarTutor);

module.exports = router;