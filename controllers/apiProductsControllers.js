const Products = require('../models/Product')

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

    //crea un producto
    createProduct : async(req,res) => {
        try {
            const { name, description, image, category,size, price } = req.body;
            if (!name || !description || !image || !category || !size || !price) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const newProduct = new Product({ name, description, image, category,size, price });
            await newProduct.save();
            
            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (err) {
            res.status(500).send('Error creating product');
        }
    },
    
    showProductById : async(req,res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            res.status(500).send('Error fetching product');
        }
    },
    updateProduct : async(req,res) => {
        try {
            const { productId } = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (err) {
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


