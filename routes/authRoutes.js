const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Verifica que esta ruta sea correcta
const authenticated = require('../middlewares/authMiddleware')

//rutas del dashboard, lista de productos que pueden gstionarse(necesita la autenticación del bonus, es decir, rutas de admin) 
//Mostrar el dashboard con los productos
router.get('/', authenticated, authController.showDashboard);

//Rutas para crear, editar, y borrar
//dvelve el formulario del nuevo producto
router.get('/new', authController.showNewProduct); 

//crea el nuevo producto
router.post('/new', authenticated, authController.createProduct);

//devuel el detalle de un producto en el dashboard con botones editar y borrar
router.get('/:productById', authenticated, authController.dashboardById); 

//Actualizar producto
router.put('/:productId', authenticated, authController.updateProduct); 
//muestra un formulario para editar el producto selecionado
router.get('/:productId/edit', authenticated, authController.showEditProduct); 
// // Eliminar producto
router.delete('/:productId/delete', authenticated, authController.deleteProduct); 

//ruta cerrar session
router.post('/logout', authController.logoutUser);

module.exports = router;