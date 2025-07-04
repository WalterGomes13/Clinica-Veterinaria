const express = require('express');
const router = express.Router();
const consultaController = require('../Controller/consultaController');

// GET - Buscar consultas por e-mail do tutor
router.get('/:email', consultaController.buscarConsultasPorTutor);

// POST - Marcar nova consulta
router.post('/', consultaController.marcarConsulta);

//PUT - Remarcar consulta
router.put('/:id', consultaController.remarcarConsulta);

//DELETE - Cancelar consulta
router.delete('/:id', consultaController.cancelarConsulta);

module.exports = router;