// Middleware para verificar el token
const admin = require('firebase-admin');
const auth = admin.auth();

const authenticated = (req, res, next) => {
  const idToken = req.cookies.token;

  if (!idToken) {
    return res.redirect('/login');
  }

  auth.verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken; //guarda la información del usuario en req.use
      next();
    })
    .catch(error => {
      console.error('Error verifying token:', error);
      res.redirect('/login');
    });
};

module.exports = authenticated

/*
const verifyToken = async (req, res, next) => {
  const idToken = req.body.idToken;

  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verifica el token con Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Añadimos el usuario decodificado a la solicitud
    next(); // El token es válido, continuar con la siguiente función
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

*/
