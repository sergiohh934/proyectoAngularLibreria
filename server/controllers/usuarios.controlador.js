const Usuario = require('../models/usuarios');

const controlador = {};

controlador.registrar = async (req, res) => {
  const { nombre, email, password, role } = req.body;

  // Verificar si el email ya existe
  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ error: 'Usuario ya existe' });

  const nuevoUsuario = new Usuario({ nombre, email, password, role });
  await nuevoUsuario.save();

  res.json({ status: 'Usuario registrado', usuario: nuevoUsuario });
};

controlador.login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email, password });
  if (!usuario) return res.status(400).json({ error: 'Credenciales incorrectas' });

  res.json({
    status: 'Login exitoso',
    usuario: {
      id: usuario._id,
      role: usuario.role,
      nombre: usuario.nombre
    }
  });
};



module.exports = controlador;
