# Acceso  a la API de la Tienda de ropa. 
El backend ya está configurado para devolver datos en formato JSON y manejar la autenticación con Firebase.

Endpoints del backend:

/auth/login: Inicia sesión.
/auth/logout: Cierra sesión.
/api/products: Obtiene productos.
/api/products/category/:category: Obtiene productos por categoría.
/api/products/:id: Obtiene un producto específico por ID.
Autenticación: Asegúrate de manejar correctamente el token de Firebase en el frontend para proteger rutas privadas como el Dashboard.

#  Estructura General del Proyecto
La estructura del proyecto es modular y bien organizada:

Rutas (routes): Manejan diferentes segmentos de la funcionalidad (productRoutes, apiProductsRoutes, authRoutes).
Controladores (controllers): Se separa la lógica de las rutas.
Modelos (models): Los esquemas de MongoDB están definidos correctamente.
Configuraciones (config): Configuración de la base de datos, Firebase y Swagger bien organizadas.
Middleware (middlewares): Manejo del token de autenticación.
2. Configuración Específica
a) CORS
javascript
Copiar código
app.use(cors());
Esto permite solicitudes desde cualquier origen. Es funcional, pero en producción deberías limitarlo a dominios específicos.

b) Swagger
javascript
Copiar código
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
Está correctamente configurado y permitirá documentar las rutas de la API. Asegúrate de que las rutas documentadas coincidan con las definidas en tu backend.

c) Métodos HTTP Extendidos
javascript
Copiar código
app.use(methodOverride('_method'));
Esto permite que formularios puedan usar métodos como PUT o DELETE. Es útil para el CRUD pero no se usa con fetch ni axios.

3. CRUD de Productos
Las rutas para los productos están bien configuradas:

GET /api/products: Devuelve todos los productos.
POST /api/products/create: Crea un nuevo producto.
GET /api/products/:productId: Obtiene un producto por su ID.
PUT /api/products/:productId/edit: Actualiza un producto.
DELETE /api/products/:productId/delete: Elimina un producto.
Están mapeadas correctamente en apiProductsRoutes.js.

4. Autenticación con Firebase
La autenticación y registro están implementados con Firebase Admin. Los controladores (authController.js) gestionan:

Registro de usuarios (POST /auth/register).
Inicio de sesión (POST /auth/login).
Cierre de sesión (POST /auth/logout).
5. Base de Datos
La conexión a MongoDB está bien configurada en db.js. Recuerda asegurarte de que la variable MONGO_URI en .env tenga un valor válido.



