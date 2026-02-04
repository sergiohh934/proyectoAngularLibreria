const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompraSchema = new Schema({
  usuarioId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  libros: [{
    libroId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Libro' 
    },
    
    libroIdString: {
      type: String,
      required: true
    },
    
    titulo: { 
      type: String, 
      required: true 
    },
    autor: { 
      type: String, 
      required: true 
    },
    precio: { 
      type: Number, 
      required: true 
    },
    cantidad: { 
      type: Number, 
      required: true 
    },
    isbn: { 
      type: String 
    },
    imagen: { 
      type: String 
    },
    categoria: { 
      type: String 
    },
    subtotal: { 
      type: Number, 
      required: true 
    }
  }],
  total: { 
    type: Number, 
    required: true 
  },
  fecha: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Compra', CompraSchema);