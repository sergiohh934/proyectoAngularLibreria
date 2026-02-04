const Compra = require('../models/compras');
const Libro = require('../models/libros');

const controlador = {};

// Crear compra (realizar compra)
controlador.crearCompra = async (req, res) => {
  try {
    const { usuarioId, libros } = req.body;

    // Validación básica
    if (!usuarioId || !libros || libros.length === 0) {
      return res.status(400).json({ 
        error: 'Datos incompletos. Se requiere usuarioId y al menos un libro.' 
      });
    }

    let total = 0;
    const librosDesnormalizados = [];

    // Validar stock
    for (let item of libros) {
      const libro = await Libro.findById(item.libroId);
      
      if (!libro) {
        return res.status(404).json({ 
          error: `Libro con ID ${item.libroId} no encontrado` 
        });
      }

      // Validar stock disponible
      if (libro.stock < item.cantidad) {
        return res.status(400).json({ 
          error: `Stock insuficiente para "${libro.titulo}". Disponible: ${libro.stock}, Solicitado: ${item.cantidad}` 
        });
      }

      // Validar cantidad positiva
      if (item.cantidad <= 0) {
        return res.status(400).json({ 
          error: 'La cantidad debe ser mayor a 0' 
        });
      }

      // Calcular subtotal
      const subtotal = libro.precio * item.cantidad;
      total += subtotal;

      // Preparar objeto 
      librosDesnormalizados.push({
        libroId: libro._id,          
        libroIdString: libro._id.toString(), 
        titulo: libro.titulo,
        autor: libro.autor,
        precio: libro.precio,          
        cantidad: item.cantidad,
        isbn: libro.isbn,
        imagen: libro.imagen,
        categoria: libro.categoria,
        subtotal: subtotal
      });

      // Actualizar stock del libro
      libro.stock -= item.cantidad;
      await libro.save();
    }

    // Crear la compra 
    const compra = new Compra({ 
      usuarioId, 
      libros: librosDesnormalizados, 
      total
    });
    
    await compra.save();

    res.json({ 
      status: 'Compra realizada exitosamente', 
      compra 
    });

  } catch (error) {
    console.error('Error al crear compra:', error);
    res.status(500).json({ 
      error: 'Error al procesar la compra',
      detalle: error.message 
    });
  }
};

// Mostrar historial de compras de un usuario
controlador.misCompras = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;

    const compras = await Compra.find({ usuarioId })
      .sort({ fecha: -1 }); // Ordenar por fecha descendente (más reciente primero)

    res.json(compras);

  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ 
      error: 'Error al obtener historial de compras',
      detalle: error.message 
    });
  }
};



module.exports = controlador;