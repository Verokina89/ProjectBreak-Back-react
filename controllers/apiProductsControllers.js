const Product = require('../models/Product')
const mongoose = require('mongoose'); // Importar mongoose como prueba

const apiProductsControllers = {
    // Obtener todos los productos
    getShowProducts : async(req,res) =>{
        try{
            const products = await Product.find()
            return res.json(products);

        }catch (err) {
            // console.error(error);
            res.status(500).send(err)
        }
    },
    createProduct : async(req,res) => {
        console.log("Ruta POST /create funcionando");
        try {
            const { name, description, image, category, color, size, price } = req.body;

            if (!name || !description || !image || !category || !color|| !size || !price) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            console.log("Data received:", req.body);
            const newProduct = new Product({ name, description, image, category, color, size, price });
            await newProduct.save();
            
            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (err) {
            res.status(500).send('Error creating product');
        }
    },
    

    showProductById: async (req, res) => {
        try {
            const { productId } = req.params;
    
            // Validar si el productId es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
    
            const product = await Product.findById(productId);
    
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            res.json(product);
        } catch (err) {
            console.error("Error fetching product:", err);
            res.status(500).send("Error fetching product");
        }
    },

    updateProduct : async(req,res) => {

        try {
            //log para depuracion
            console.log('Params:', req.params);
            console.log('Body:', req.body);

            const { productId } = req.params;
            const { name, description, image, category, color, size, price } = req.body;

            if (!name || !description || !image || !category || !color || !size || !price) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const existingProduct = await Product.findById(productId);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Producto no encontrado.' });
            }
            const updatedProduct = await Product.findByIdAndUpdate(productId, 
                { name, description, image, category, color, size, price }, 
                { new: true, runValidators: true } 
            );
            res.json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
        }
    },
    deleteProduct : async(req,res) => {
        try {
            const { productId } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).send('Error deleting product');
        }
    
    }

};

module.exports = apiProductsControllers;