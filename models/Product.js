const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['T-shirts', 'Sweaters', 'Accessories', 'Snack'], 
        required: true 
    },
    size: { 
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'xs', 's', 'm', 'l', 'xl', 'ALLS'], 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },


}, { timestamps: true });

ProductSchema.index({nombre: 1});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;