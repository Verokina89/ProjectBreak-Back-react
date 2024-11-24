const mongoose = require('mongoose')
const Product = require('../models/Product')
const { baseHtml, generateHtml, getProductCards, getNavBar, renderProductForm, productDetailsHtml, groupByCategory, showProductButtons } = require('../public/utils/html');
const path = require('path');
const app = require ('../config/firebase')

// Funciones del controlador de productos
const ProductController = {
    
    showProductsByCategory: async (req, res) => {
        try {
            const categoryFilter = req.params.category; // Captura la categoría de la URL (si existe)
            let products;
            if (categoryFilter) {
                // Filtrar productos por la categoría especificada
                products = await Product.find({ category: categoryFilter });
            } else {
                // Si no hay filtro de categoría, obtener todos los productos
                products = await Product.find();
            }
            // Validar si existen productos
            if (products.length === 0) {
                return res.status(404).send('No hay productos disponibles.');
            }
            // Agrupar productos por categoría si no hay un filtro específico
            let htmlContent = '';
            if (!categoryFilter) {
                const categories = groupByCategory(products);
                for (const category in categories) {
                    const categoryProducts = categories[category];
                    const productCards = getProductCards(categoryProducts);
                    // Añadir la categoría al HTML
                    htmlContent += `
                        <h2 style="text-align: center; margin-bottom: 10px;">${category}</h2>
                        <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
                            ${productCards}
                        </div>
                    `;
                }
            } else {
                // Si hay un filtro de categoría, mostrar solo esos productos
                htmlContent = `
                    <h2 style="text-align: center; margin-bottom: 10px;">${categoryFilter}</h2>
                    <div class="category-products" style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px; margin-bottom: 20px;">
                        ${getProductCards(products)}
                    </div>
                `;
            }
            // Crear el HTML final con el navbar
            const html = generateHtml(`
                ${getNavBar()}
                ${htmlContent}
            `);
            res.send(html);
        } catch (err) {
            console.error(err); // Log de error
            res.status(500).send('Error del servidor');
        }
    },
    
     //mostra un producto por ID
    showProductById: async (req, res) => {
        // console.log("Entrando en showProductById");
        try {
            // Obtener el productId de los parámetros de la ruta
            const { productId } = req.params;
            console.log("ID:", productId);
            // Verificar si el productId es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).send('Invalid product ID');
            }
            //buscar el producto por su ID y los obtiene de la bbdd
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
          
            const productHtml = productDetailsHtml(product);
            // Enviar la respuesta con el HTML generado
            const html = generateHtml(`
                ${getNavBar()}
                ${productHtml}
            `);
            res.send(html);
        } catch (err) {
            // Capturar cualquier error y devolver un error de servidor
            console.error(err);
            res.status(500).send('Server error');
        }
    },

    
    
};

module.exports = ProductController;

