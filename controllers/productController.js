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





/*
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { baseHtml, generateHtml, getProductCards, getNavBar, renderProductForm, productDetailsHtml, groupByCategory, showProductButtons } = require('../public/utils/html');
const path = require('path');
const app = require ('../config/firebase')


const ProductController = {
    showProductsByCategory: async (req, res) => {
        try {
            const categoryFilter = req.params.category; // Captura la categoría de la URL (si existe)
            let products;

            if (categoryFilter) {
                // Filtrar productos por categoría
                products = await Product.find({ category: categoryFilter });
            } else {
                // Si no hay filtro, devolver todos los productos
                products = await Product.find();
            }

            // Validar si existen productos
            if (!products.length) {
                return res.status(404).json({ message: 'No hay productos disponibles.' });
            }

            // Devolver los productos como JSON
            res.status(200).json({ success: true, data: products });
        } catch (err) {
            console.error(err); // Log de error en consola
            res.status(500).json({ success: false, message: 'Error del servidor', error: err.message });
        }
    },

    showProductById: async (req, res) => {
        try {
            const { productId } = req.params;

            // Validar si el productId es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ success: false, message: 'ID de producto no válido' });
            }

            // Buscar el producto en la base de datos
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }

            // Devolver el producto como JSON
            res.status(200).json({ success: true, data: product });
        } catch (err) {
            console.error(err); // Log de error en consola
            res.status(500).json({ success: false, message: 'Error del servidor', error: err.message });
        }
    },
};

module.exports = ProductController;
*/