
const admin = require('../config/firebase'); // Firebase Admin SDK

const authController = {
  // // Registro de usuario en Firebase
  // registerUser: async (req, res) => {
  //   const { email, password } = req.body;

  //   if (!email || !password) {
  //     return res.status(400).json({ error: 'El correo electrónico y la contraseña son obligatorios.' });
  //   }

  //   try {
  //     // Crear usuario en Firebase
  //     const userRecord = await admin.auth().createUser({ email, password });

  //     res.status(201).json({
  //       success: true,
  //       message: 'Usuario registrado correctamente en Firebase.',
  //       user: {
  //         id: userRecord.uid,
  //         email: userRecord.email,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error al registrar usuario:', error);
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  
  loginUser: async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Token no proporcionado' });
    }

    try {
      //verificar el token de Firebase
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      //extrae info del usuario
      const { uid, email } = decodedToken;

      //token personalizado
      const customToken = await admin.auth().createCustomToken(uid);

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        user: {
          id: uid,
          email,
        },
        token: customToken, 
      });
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  },

 
  logoutUser: async (req, res) => {
    try {
      res.clearCookie('token'); 
      res.status(200).json({
        success: true,
        message: 'Sesión cerrada correctamente',
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  },
};

module.exports = authController;




// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email y contraseña son requeridos" });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Credenciales inválidas" });
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET,/*"your_jwt_secret",*/ {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ message: "Inicio de sesión exitoso", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al iniciar sesión" });
//   }n
// };

// module.exports = { login };

