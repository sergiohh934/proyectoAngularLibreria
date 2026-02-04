const express = require('express');
const router = express.Router();
const controlador = require('../controllers/compras.controlador');

// Crear nueva compra
router.post('/', controlador.crearCompra);

// Obtener historial de compras de un usuario
router.get('/usuario/:usuarioId', controlador.misCompras);

module.exports = router;
