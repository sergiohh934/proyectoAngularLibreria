const mongoose = require('mongoose');

// URL de conexión a Atlas
//const URI = 'mongodb+srv://sergiohh934_db:proyectomeanlibreria@libreria.or4siuh.mongodb.net/?appName=libreria';
const URI= "mongodb://localhost:27017/libros";
mongoose.connect(URI)
  .then(() => console.log('Base de datos conectada online'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

module.exports = mongoose;
