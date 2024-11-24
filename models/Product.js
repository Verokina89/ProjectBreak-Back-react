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
        enum: ['T-shirts', 'Sweters', 'Accessories', 'Snack'], 
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
    // stock: { 
    //     type: Number, 
    //     required: true 
    // },


}, { timestamps: true });

ProductSchema.index({nombre: 1}); //Crea un indice en el campo "nombre" del producto en la funcion 'PoductSchema'. Lo que hace es señalar que el indice sera en orden ascendente (y -1 para descendete ) permitiendo mejorar la busqueda (en base al tiempo de respuesta rápida) cuando se usan los metodo find(), findOne() u otras (solo en nombre)

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

/*
BUSCAR INFO DE COMO CREAR UNA validacion (VALIDATOR) en la descriptin, en image, categry, size y un mensaje sino cumple con lo indicado
*/