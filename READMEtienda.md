Tienda de Ropa
Este proyecto consiste en una tienda de ropa con un catálogo de productos y un dashboard para el administrador. Los productos se guardarán en una base de datos de MongoDB en Atlas, y se podrá acceder al dashboard para gestionar los productos (crear, editar, eliminar). El sistema incluye autenticación mediante Firebase para restringir el acceso al dashboard solo a usuarios autorizados.

Índice
Estructura de archivos
Creación de la base de datos
Creación del servidor
Creación de modelos
Creación de rutas
Creación de controladores
Despliegue
Documentación
Bonus 1 - Tests
Bonus 2 - Autenticación con Firebase
Bonus 3 - API y documentación con Swagger
Recursos
Estructura de archivos
scss
Copiar código
.
├── config
│   ├── db.js
│   └── firebase.js (BONUS)
├── controllers
│   ├── productController.js
│   └── authController.js (BONUS)
├── models
│   └── Product.js
├── routes
│   ├── productRoutes.js
│   └── authRoutes.js (BONUS)
├── middlewares (BONUS)
│   └── authMiddleware.js
├── public
│   ├── styles.css
│   └── images (OPCIONAL)
├── views
│   ├── dashboard.html
│   └── productForm.html
├── .env
├── index.js
└── package.json
Descripción de los archivos:
config/db.js: Configuración de la base de datos, conectando a MongoDB Atlas.
controllers/productController.js: Lógica para manejar las solicitudes CRUD de productos.
models/Product.js: Esquema de producto utilizando Mongoose.

routes/productRoutes.js: Definición de las rutas CRUD de productos.

index.js: Punto de entrada de la aplicación, configuración del servidor Express y manejo de rutas.

public/: Archivos estáticos, como CSS o imágenes opcionales.

views/dashboard.html: Dashboard donde el administrador puede ver, agregar, editar y eliminar productos.

.env: Variables de entorno, como URI de la base de datos y claves de Firebase.

package.json: Archivo de configuración de las dependencias del proyecto.

Archivos Bonus
config/firebase.js: Configuración de Firebase para autenticación de usuarios.

controllers/authController.js: Lógica de autenticación con Firebase.

middlewares/authMiddleware.js: Middleware que protege rutas para que solo usuarios autenticados puedan acceder.

Creación de la base de datos
Crea un nuevo cluster en MongoDB Atlas.
Crea una base de datos y copia la URI de conexión.
Guarda la URI en tu archivo .env: MONGO_URI=mongodb+sr....

Crear/instalar servidor:
Instala Express, Mongoose, y otras dependencias necesarias:

bash
(comandos de instalacion)
npm install express mongoose dotenv cors
Crea el archivo index.js que será el punto de entrada del servidor:

javascript
(codigo de ejemplo)
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Creación de modelos
El modelo de producto tiene los siguientes campos:

name: Nombre del producto.
description: Descripción.
image: URL de la imagen.
category: Categoría (Camisetas, Pantalones, Zapatos, Accesorios).
size: Talla (XS, S, M, L, XL).
price: Precio.
Ejemplo del esquema en models/Product.js:

javascript
Copiar código
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  category: String,
  size: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);


Creación de rutas(son ejemplos de rutas):
GET /api/products: Devuelve todos los productos.
GET /api/products/:id: Devuelve el detalle de un producto.
POST /api/products: Crea un nuevo producto.
PUT /api/products/:id: Actualiza un producto existente.
DELETE /api/products/:id: Elimina un producto.
Ejemplo en routes/productRoutes.js:

javascript
(CODIGOS DE EJEMPLOS))
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
Creación de controladores
En controllers/productController.js, implementamos las funciones del CRUD. Ejemplo de la función para obtener todos los productos:

javascript
Copiar código
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

Despliegue:

Crea una cuenta en Render o cualquier plataforma de despliegue.
Conecta tu repositorio y realiza el despliegue.
Asegúrate de configurar las variables de entorno en la plataforma de despliegue (como la URI de MongoDB y claves de Firebase).

Documentación:
Incluye un archivo README.md en tu repositorio para documentar cómo poner en marcha la aplicación y explicar las rutas de la API y funcionalidades del dashboard.

Autenticación con Firebase
Configura la autenticación de Firebase para que solo los administradores logueados puedan acceder al dashboard. Ve el tutorial de Firebase para más detalles.

API y documentación con Swagger
Utiliza Swagger para documentar la API, facilitando el uso por otros desarrolladores. Instrucciones detalladas disponibles en la documentación oficial de Swagger.

RECURSOS:
Express
Mongoose
MongoDB Atlas
Firebase
Render
Jest
