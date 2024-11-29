
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/', ProductController.showAllProducts)

// Ruta para obtener productos por categoría (o todos los productos si no hay filtro)
router.get('/category/:category?', ProductController.showProductsByCategory);

// Ruta para obtener un producto específico por ID
router.get('/:productId', ProductController.showProductById);

module.exports = router;
