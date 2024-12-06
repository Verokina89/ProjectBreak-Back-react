//datos requeridos para ususario registrado

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        trim:true
    },
    image : {
        type : String,
        required : true,
        validate:{
            validator: function(v) {
                const imagePattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i 
                const imagenPatternTwo = /^https:\/\/api\.dicebear\.com\/9\.x\/initials\/svg\?seed=[a-zA-Z0-9-_]+$/;
                return imagePattern.test(v) || imagenPatternTwo.test(v)
            },
            message:'Image must be a URL valid or a format ,.png, .jpeg, .jpg, .gif, .webp'
        }
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    
    address:{
        type:String,
        trim:true
    },
    preferences:{
        type:[String],
        trim:true
    },
    uid:{
        type:String,
        required: true,
        trim:true 
    },
    password:{
        type:String,
        require:true,
        trim: true
    }

},{timestamps:true})

const User = mongoose.model('UserDB',UserSchema)

export default User