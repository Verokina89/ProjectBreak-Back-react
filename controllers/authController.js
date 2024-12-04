const admin = require('../config/firebase');

const authController = {
  //pagina para registro opcional, depende de tu frontend
  register: async (req, res) => {
    res.send('Página de registro');
  },

  //registra nuevo usuario
  registerUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'El correo electrónico y la contraseña son obligatorios.' });
    }

    try {
      //crea usuario en Firebase
      const userRecord = await admin.auth().createUser({ email, password });
      res.status(201).json({ success: true, user: userRecord });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(400).json({ error: error.message });
    }
  },

  //depende del flujo del frontend)
  login: (req, res) => {
    res.send('Página de login');
  },

  //inicio de sesión
  loginUser: async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Token no proporcionado' });
    }

    try {
      //verificar token de Firebase
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      // Extraer información del usuario
      const { uid, email } = decodedToken;

      //busca informacion del usuario en tu base de datos usando el `uid`

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        user: { uid, email },
      });
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  },

  // Manejo de cierre de sesión
  logoutUser: async (req, res) => {
    try {
      res.clearCookie('token'); // Limpia la cookie del token
      res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  },
};

module.exports = authController;


/*
const admin = require('../config/firebase');

const authController = {
  register: async (req, res) => {
    res.send('Página de registro');
  },

  registerUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userRecord = await admin.auth().createUser({ email, password });
      res.status(201).json({ success: true, user: userRecord });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: (req, res) => {
    res.send('Página de login');
  },

  loginUser: async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // Opcional: Si tienes una base de datos, puedes buscar información adicional del usuario usando el `uid` del token decodificado.
        const { uid, email } = decodedToken

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: { uid, email },
        });
    } catch (error) {
      
    }
  },

  logoutUser: async (req, res) => {
    try {
      res.clearCookie('token'); // Limpia la cookie del token
      res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  },

};

module.exports = authController;
*/