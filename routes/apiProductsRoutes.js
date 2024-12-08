const express = require('express')
const router = express.Router()
const ApiProductsControllers = require('../controllers/apiProductsControllers')

//ruta de todos los productos
router.get('/products', ApiProductsControllers.getShowProducts);   

//ruta de un producto Actualizado
router.put('/:productId/edit', ApiProductsControllers.updateProduct);  

//ruta para crear un nuevo producto
router.post('/create', ApiProductsControllers.createProduct); 


//ruta de un producto por su ID
router.get('/:productId', ApiProductsControllers.showProductById); 

// router.put('/:productId/edit', (req, res) => {
//     console.log('Ruta PUT /:productId/edit alcanzada con params:', req.params);
//     res.send('Ruta alcanzada');
// });


//rut para eliminar un producto por ID
router.delete('/:productId/delete', ApiProductsControllers.deleteProduct); 

module.exports = router;