const Libro = require('../models/libros');

const controlador = {};

//  Mostrar todos los libros (mostrarLibros) GET
controlador.mostrarLibros = async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
};
// Crear libro (crearLibro) POST
controlador.crearLibro = async (req, res) => {
  const { titulo, autor, descripcion, precio, isbn, categoria, stock } = req.body;
  const imagen = req.file ? req.file.filename : 'default.png';

  const nuevo = new Libro({
    titulo,
    autor,
    descripcion,
    precio,
    isbn,
    categoria,
    stock,
    imagen
  });

  await nuevo.save();
  res.json({ status: 'Libro guardado', libro: nuevo });
};
// Mostrar Libro por id (mostrarLibro)GET
controlador.mostrarLibro = async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  res.json(libro);
};
// Editar libro (editarLibro) PUT
controlador.editarLibro = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };
    if (req.file) {
      updateData.imagen = req.file.filename;
    }
    await Libro.findByIdAndUpdate(req.params.id, updateData);
    res.json({ status: "Libro actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar libro", detalle: error });
  }
};
//Mostrar categorias (getCategorias) ??
controlador.mostrarCategorias = async (req, res) => {
  const libros = await Libro.find();
  const categorias = [...new Set(libros.map(lib => lib.categoria))];
  res.json(categorias);
};
// Borrar un libro por id (borrarlibro) delete
controlador.borrarLibro = async (req, res) => {
  await Libro.findByIdAndDelete(req.params.id);
  res.json({ status: "Libro borrado" });
};

module.exports = controlador;
