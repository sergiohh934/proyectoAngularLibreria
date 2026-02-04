const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path'); 

const app = express();
require('./database');

app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(cors({ origin: 'http://localhost:4200' })); 
app.use(morgan('dev'));
app.use(express.json());

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando');
});

// Rutas de API
app.use('/api/libros', require('./routes/libros.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/compras', require('./routes/compras.routes'));

app.listen(app.get('port'), () => {
  console.log('Servidor backend ejecutándose en http://localhost:' + app.get('port'));
});
