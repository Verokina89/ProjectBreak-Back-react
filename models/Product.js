const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio']
    },
    description: { 
        type: String, 
        required: [true, 'Descripcion obligatoria']
    },
    image: { 
        type: String, 
        required: [true, 'La imagen es obligatoria'] 
    },
    category: { 
        type: String, 
        enum: ['T-shirts', 'Sweaters', 'Accessories', 'Snack'], 
        required: [true, 'La categoria es obligatoria' ]
    },
    size: { 
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'xs', 's', 'm', 'l', 'xl', 'All', 'all'], 
        required: [true, 'Talla obligatoria']
    },
    price: { 
        type: Number, 
        required: [true, 'Precio obligatorio'] 
    },
    color: { 
        type: String,
        enum: ['Blanco', 'Negro', 'Marron', 'Amarillo', 'Naranja', 'Granate', 'Azul', 'Verde', 'Gris', 'Rosado', 'Morado', 'Rojo'], 
        required: [true, 'Color obligatoria']
    },
    // stock: { 
    //     type: Number, 
    //     required: true 
    // },

}, { timestamps: true });

ProductSchema.index({nombre: 1});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;