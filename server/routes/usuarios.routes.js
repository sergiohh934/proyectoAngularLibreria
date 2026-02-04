const express = require('express');
const router = express.Router();
const controlador = require('../controllers/usuarios.controlador');

router.post('/registro', controlador.registrar);
router.post('/login', controlador.login);
module.exports = router;
