const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// //ruas de registro
router.get('/register', authController.register);
router.post('/register', authController.registerUser);

//rutas login
router.get('/login', authController.login);
router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

module.exports = router;