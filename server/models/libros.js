const mongoose = require("mongoose");
const { Schema } = mongoose;

const LibroSchema = new Schema(
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true},
    imagen: { 
      type: String, 
      default: "default.png" 
    }
  }
);

module.exports = mongoose.model("Libro", LibroSchema);
