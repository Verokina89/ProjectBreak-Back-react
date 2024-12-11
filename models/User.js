//datos requeridos para ususario registrado
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
    },
    password:{
        type:String,
        require:true,
        trim: true
    },

},{timestamps:true})

module.exports = mongoose.model("User", UserSchema);