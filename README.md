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



Explicación del código en APP.JS:
Voy a dividirlo en secciones y explicarte cada una detalladamente.

1️⃣ Importación de módulos y configuración inicial
const express = require('express');
const dotenv = require('dotenv');
const { dbConnection } = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const swaggerUI = require('swagger-ui-express');
🔹 ¿Qué hace esta sección?
Aquí estás importando todos los módulos necesarios para que tu servidor Express funcione.

🔹 Explicación de cada uno:
express → Framework de Node.js para manejar rutas y solicitudes HTTP.
dotenv → Permite manejar variables de entorno desde un archivo .env.
dbConnection → Función personalizada que conecta a la base de datos.
cookieParser → Permite manejar cookies en las solicitudes.
cors → Habilita solicitudes desde diferentes dominios (muy útil si el frontend y backend están en servidores distintos).
path → Módulo de Node.js para manejar rutas de archivos y directorios.
methodOverride → Permite que formularios HTML puedan enviar métodos PUT y DELETE, ya que los formularios solo permiten GET y POST.
swaggerUI → Se usa para documentar la API y visualizar las rutas en una interfaz web.

2️⃣ Importación de rutas y configuración de Firebase

const productRoutes = require('./routes/productRoutes');
const ApiProductsRoutes = require('./routes/apiProductsRoutes');
const docs = require('./config/docs/index');
require('./config/firebase');
🔹 ¿Qué hace esta sección?
Importa las rutas de productos (productRoutes y ApiProductsRoutes).
Importa la documentación docs para Swagger.
Ejecuta require('./config/firebase'), lo que significa que en ese archivo se configura Firebase y se ejecuta inmediatamente al iniciar el servidor.

3️⃣ Cargar variables de entorno
dotenv.config();
🔹 ¿Qué hace esto?
Carga las variables del archivo .env para que el servidor pueda acceder a ellas.
Por ejemplo, si tienes en .env algo como:
PORT=5000
DATABASE_URL=mongodb+srv://...
Puedes acceder a ellas en el código usando process.env.PORT o process.env.DATABASE_URL.

4️⃣ Crear la aplicación Express
const app = express();
🔹 ¿Qué hace esto?
Crea una instancia de Express para manejar las rutas y configuraciones del servidor.
5️⃣ Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //para formularios
app.use(express.static(path.join(__dirname,"public")));  //servir archivos estáticos
app.use(cookieParser());
app.use(methodOverride('_method'));
🔹 ¿Qué hace esta sección?
Los middleware son funciones que se ejecutan antes de que una solicitud llegue a su controlador final.

🔹 Explicación de cada uno:
app.use(cors()); → Permite peticiones desde otros dominios, útil cuando el frontend y backend están en servidores distintos.
app.use(express.json()); → Permite recibir datos en formato JSON en las solicitudes POST y PUT.
app.use(express.urlencoded({ extended: false })); → Permite recibir datos de formularios HTML.
app.use(express.static(path.join(__dirname, "public"))); → Permite servir archivos estáticos (CSS, imágenes, JavaScript).
app.use(cookieParser()); → Habilita el manejo de cookies en el backend.
app.use(methodOverride('_method')); → Permite que los formularios HTML usen PUT y DELETE con ?_method=PUT en la URL.

6️⃣ Configuración de rutas
app.use('/api/products', productRoutes, ApiProductsRoutes);
🔹 ¿Qué hace esto?
Asigna productRoutes y ApiProductsRoutes a la ruta base /api/products.
Si hay conflictos entre las rutas, puede ser mejor separarlas, como:
app.use('/api/products', productRoutes);
app.use('/api/products/api', ApiProductsRoutes);
Pero si no hay conflictos, tu código está bien.

7️⃣ Ruta base de la API
app.get("/", (req, res) => {
    res.send("Bienvenid@s a la API de KIANELA. Para interactuar puede utilizar las siguientes rutas: /api/products   /api/products/category/T-shirts     /api/products/6715204871875b76cf03ab42 ");
});
🔹 ¿Qué hace esto?
Cuando un usuario visita /, se muestra un mensaje de bienvenida con las rutas disponibles.

8️⃣ Ruta de autenticación.
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
🔹 ¿Qué hace esto?
Manejara LA autenticación en /auth usando authRoutes.

9️⃣ Documentación con Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
console.log("Rutas de productos registradas en /api/products");
🔹 ¿Qué hace esto?
Habilita Swagger en /api-docs para visualizar la documentación de la API.

🔟 Ruta de login con validación
app.post("/api/login", (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
    }
    console.log(req.body);
    res.json({ message: "Login exitoso" });
});
🔹 ¿Qué hace esto?
Recibe un POST con email y password.
Si faltan, responde con error 400.
Si los recibe, responde "Login exitoso" (aunque aún no hay lógica real de autenticación).

1️⃣1️⃣ Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ message: 'ERROR this link does not exist in the backend(app.js)' });
});
🔹 ¿Qué hace esto?
Si ninguna ruta coincide con la solicitud, responde con un error 404.

1️⃣2️⃣ Conectar a la base de datos y arrancar el servidor
dbConnection();
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
🔹 ¿Qué hace esto?
Conecta a la base de datos.
Inicia el servidor en el puerto configurado (process.env.PORT o 4500 si no hay uno definido).


Ejemplo de como deben de ser probadas las rutas en postman:

IMG1:

IMG2:

IMG3: