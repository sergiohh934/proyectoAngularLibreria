const express = require('express');
const router = express.Router();
const controlador = require('../controllers/libros.controlador');
const multer = require('multer');
const path = require('path');

// CONFIGURACIÓN MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/');  // Carpeta donde guardar imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

const upload = multer({ storage });

// IMPORTANTE: rutas específicas ANTES que "/:id"
router.get('/categorias', controlador.mostrarCategorias);

// Rutas CRUD de libros
router.get('/', controlador.mostrarLibros);
router.post('/', upload.single('imagen'), controlador.crearLibro);
router.get('/:id', controlador.mostrarLibro);
router.put('/:id', upload.single('imagen'), controlador.editarLibro);
router.delete('/:id', controlador.borrarLibro);

module.exports = router;
