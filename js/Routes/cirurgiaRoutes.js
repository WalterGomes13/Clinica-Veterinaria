const express = require('express');
const router = express.Router();
const cirurgiaController = require('../Controller/cirurgiaController');

// GET - Buscar cirurgias por e-mail do tutor
router.get('/:email', cirurgiaController.buscarCirurgiasPorTutor);

// POST - Marcar nova cirurgia
router.post('/', cirurgiaController.marcarCirurgia);

//PUT - Remarcar cirurgia
router.put('/:id', cirurgiaController.remarcarCirurgia);

//DELETE - Cancelar cirurgia
router.delete('/:id', cirurgiaController.cancelarCirurgia);

module.exports = router;