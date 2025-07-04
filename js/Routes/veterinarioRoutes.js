const express = require('express');
const router = express.Router();
const veterinarioController = require('../Controller/veterinarioController');

// GET - Buscar veterinarios 
router.get('/', veterinarioController.buscarVeterinario);

module.exports = router;