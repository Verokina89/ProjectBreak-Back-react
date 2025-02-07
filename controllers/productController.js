const Product = require('../models/Product'); // Importa el modelo de productos

// Controlador para obtener todos los productos
exports.showAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

//controlador para manejar la creacion de producto(prueba aqui esta funcion para ver si el error de no poder crear el producto tiene que ver con que solo esta la funcion en los controlodares de las rutas para autenticados es decir apiProductsControllers.js)
exports.createProduct = async (req,res) => {
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

// Controlador para obtener productos por categoría
exports.showProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos en esta categoría' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos por categoría' });
  }
};

// Controlador para obtener un producto por ID
exports.showProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

