
const express = require('express')
const dotenv = require('dotenv')
const { dbConnection } = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
// const showAllProducts = require('./controllers/productController')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const docs = require('./config/docs/index')
const path = require('path');
require('./config/firebase')

//config dotenv.Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));  //servir archivos estaticos; HTML,CSS, js e imágenes

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(methodOverride('_method')) //soporta POST-PUT-DELETE en formularios

//Ruta API
app.use('/api/products', productRoutes);
//ruta autenticacin
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
console.log("Rutas de productos registradas en /api/products");

//ruta base home(kianela)
// app.get('/', showAllProducts)
app.get("/", (req, res) => {
    res.send("Bienvenid@s a la API de KIANELA. Para interactuar puede utilizar las siguientes rutas: /api/products   /api/products/category/T-shirts     /api/products/6715204871875b76cf03ab42 ");
});
//app.use('/users',authUser)

//ruta Errores
app.use((req,res)=>{
    res.status(404).json({message:'ERROR this link does not exist in the backend'})
})

// Conectar a la base de datos
dbConnection();

// Servidor
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});