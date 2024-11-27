const express = require('express');
const { dbConnection } = require('./config/db');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
dbConnection();

// Rutas
app.use('/api', productRoutes);

// Servidor
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

/*
const express = require('express');
const dotenv = require('dotenv')
const { dbConnection } = require('./config/db');
const methodOverride = require('method-override');
const path = require('path');
const admin = require('firebase-admin');
const {serviceAccount} = require('./config/firebase');
const cookieParser = require('cookie-parser')
const cors = require("cors")
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

dotenv.config()  //carga variables de entorno

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes')  
const apiRoutes = require('./routes/apiProductsRoutes');

//Middlewares
app.use(cors())
app.use(express.json())  
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")));  //servir archivos estaticos; HTML,CSS, js e imágenes

app.use(methodOverride('_method')) //soportar PUT y DELETE en formularios

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

//Ruta publica
app.use('/', productRoutes)
// Rutas de usuarios (dashboard)
app.use('/dashboard', authRoutes)

//ruta API
app.use('/apiproducts', apiRoutes)

//Conexión a la base de datos MongoDB
dbConnection()

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}/`)
});
*/