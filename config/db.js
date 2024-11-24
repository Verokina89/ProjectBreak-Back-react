const mongoose = require('mongoose')
const dotenv = require('dotenv')

//crga vaiables de entorno
dotenv.config()

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected correctly');
        
    } catch (error) {
        console.error(error);
        throw new Error('Error starting database');
    }
};

module.exports = { dbConnection };