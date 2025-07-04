const express = require('express');
const router = express.Router();
const estoqueController = require('../Controller/estoqueController');

// GET - Buscar produtos 
router.get('/', estoqueController.buscarProdutos);

// POST - Movimentar estoque
router.post('/', estoqueController.movimentarEstoque);

module.exports = router;