const express = require('express')
const router = express.Router()
const ApiProductsControllers = require('../controllers/apiProductsControllers')

//ruta de todos los productos
router.get('/products', ApiProductsControllers.getShowProducts);   

//ruta para crear un nuevo producto
router.post('/create', ApiProductsControllers.createProduct); 

//ruta de un producto por su ID
router.get('/:productId', ApiProductsControllers.showProductById); 

//ruta de un producto Actualizado
router.put('/:productId/edit', ApiProductsControllers.updateProduct);  

//rut para eliminar un producto por ID
router.delete('/:productId/delete', ApiProductsControllers.deleteProduct); 

module.exports = router;