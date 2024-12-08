const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
require('./config/firebase')

//config dotenv.Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware parsea JSON
app.use(cors());
app.use(express.json());

//ruta autenticacin
app.use('/auth', authRoutes);

app.use('/api/products', productRoutes);


//ruta base home(kianela)
app.get("/", (req, res) => {
    res.send("Bienvenid@s a la API de KIANELA. Para interactuar puede utilizar las siguientes rutas: /api/products   /api/products/category/T-shirts     /api/products/6715204871875b76cf03ab42 ");
});
//app.use('/users',authUser)

//ruta Errores
// app.use((req,res)=>{
//     res.status(404).json({message:'ERROR this link does not exist'})
// })

// Conectar a la base de datos
dbConnection();

// Servidor
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});