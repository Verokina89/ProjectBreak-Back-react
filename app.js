
const express = require('express')
const dotenv = require('dotenv')
const { dbConnection } = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const swaggerUI = require('swagger-ui-express')

// const showAllProducts = require('./controllers/productController')
const productRoutes = require('./routes/productRoutes');
const ApiProductsRoutes = require('./routes/apiProductsRoutes');
const docs = require('./config/docs/index')
require('./config/firebase')

//config dotenv.Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))  //para formilarios
app.use(express.static(path.join(__dirname, "public")));  //servir archivos estaticos; HTML,CSS, js e imágenes
app.use(cookieParser());
app.use(methodOverride('_method')); //soporta POST-PUT-DELETE en formularios

//Rutas API
// app.use('/api/products', productRoutes, ApiProductsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/products/v1', ApiProductsRoutes);

//ruta autenticacin
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

//ruta Swagger docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
console.log("Rutas de productos registradas en /api/products");

//ruta base home(kianela)
// app.get('/', showAllProducts)
app.get("/", (req, res) => {
    res.send("Bienvenid@s a la API de la tienda KIANELA. Para interactuar puede utilizar las siguientes rutas: /api/products   /api/products/category/T-shirts     /api/products/6715204871875b76cf03ab42   /api/products/6715204871875b76cf03ab427edit ");
});

app.post("/api/login", (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Email y contraseña requeridos" });
    }
    console.log(req.body);
    res.json({ message: "Login exitoso" });
});

//ruta Errores 404
app.use((req,res)=>{
    res.status(404).json({message:'ERROR this link does not exist in the backend(app.js)'})
})

// Conectar a la base de datos
dbConnection();

// Servidor
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});