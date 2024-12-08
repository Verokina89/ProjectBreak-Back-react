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