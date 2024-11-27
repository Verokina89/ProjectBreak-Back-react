const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productsControllers');

// Ruta para obtener productos por categoría (o todos los productos si no hay filtro)
router.get('/products/:category?', ProductController.showProductsByCategory);

// Ruta para obtener un producto específico por ID
router.get('/product/:productId', ProductController.showProductById);

module.exports = router;




/*
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
//importar las funcione del controllador d productos
const ProductController = require('../controllers/productController');
const authController = require('../controllers/authController');

// Rutas publicas
// router.get('/', ProductController.showProducts.);
//ruta para mostrar todos los productosraiz(home)
router.get('/', ProductController.showProductsByCategory); 

// Ruta para mostrar productos filtrados por categoría
router.get('/category/:category', ProductController.showProductsByCategory);

//rutas por Id
router.get('/products/:productId', ProductController.showProductById);

//ruta register-login
router.get('/register', authController.register );
router.post('/register', authController.registerUser);

router.get('/login', authController.login);
router.post('/login', authController.loginUser);

module.exports = router;
*/