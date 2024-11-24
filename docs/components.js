//contiene definiciones reutilizables con esquems,parametros,etc. (se accede mdiant $ref)
module.exports = {
    components : {
        schemas:{
            Product:{
                type: "object",
                properties:{
                    "_id": {
                        type:"ObjectId",
                        description:"unique number that identifies a product",
                        example:"670afc20fa8c88b4f74739c4"
                    },
                    "name":{
                        type:"String",
                        description : "product title",
                        example:"Gorra Truck"
                    },
                    "description":{ 
                        type:"String",
                        description : "indicates product characteristics",
                        example:""
                    },
                    "image": {
                        type:"String",
                        description : "makes visual reference to the product",
                        example : "https://http2.mlstatic.com/D_989293-MLA47647785781_092021-O.jpg"
                    },
                    "category": {
                        type:"String",
                        description : "name that classifies the type of product",
                        example :"Acceories",
                    },
                    "size": {
                        type:"String",
                        description : "diameter or measurements of the product",
                        example : "M"
                    },
                    "price": {
                        type:"Number",
                        description : "monetary value of the product",
                        example : 13.9
                    }
                },
            },
            ProductById:{
                type: "object",
                properties:{
                    
                    name:{
                        type:"String",
                        description : "product title",
                        example:"Gorra Truck"
                    },
                    description:{ 
                        type:"String",
                        description : "indicates product characteristics",
                        example:""
                    },
                    image: {
                        type:"String",
                        description : "makes visual reference to the product",
                        example : "https://http2.mlstatic.com/D_989293-MLA47647785781_092021-O.jpg"
                    },
                    category: {
                        type:"String",
                        description : "name that classifies the type of product",
                        example :"Acceories",
                    },
                    size: {
                        type:"String",
                        description : "diameter or measurements of the product",
                        example : "M"
                    },
                    price: {
                        type:"Number",
                        description : "monetary value of the product",
                        example : 13.9
                    }         
                },
                required: ["name", "description", "category", "price"]
            },
            ProductByCategory:{
                type:"object",
                properties:{
                    type:"String",
                    description : "name that classifies the type of product",
                    example :"Acceories"
                }
            },
            UdateProduct:{
                type: "object",
                properties:{
                    apiKey:{
                        type:"String",
                        description : "product title",
                        example:"Gorra Truck"
                    },
                    name:{
                        type:"String",
                        description : "product title",
                        example:"Gorra Truck"
                    },
                    description:{ 
                        type:"String",
                        description : "indicates product characteristics",
                        example:""
                    },
                    image: {
                        type:"String",
                        description : "makes visual reference to the product",
                        example : "https://http2.mlstatic.com/D_989293-MLA47647785781_092021-O.jpg"
                    },
                    category: {
                        type:"String",
                        description : "name that classifies the type of product",
                        example :"Acceories",
                    },
                    size: {
                        type:"String",
                        description : "diameter or measurements of the product",
                        example : "M"
                    },
                    price: {
                        type:"Number",
                        description : "monetary value of the product",
                        example : 13.9
                    }         
                        
                },
                required: ["name", "description", "category", "price"]
            },
            DeleteProductId:{
                type: "object",
                properties:{
                    apiKey:{
                        type:"String",
                        description : "product title",
                        example:"Gorra Truck"
                    },         
                },
                required: ["name", "description", "category", "price"]
            }
        }
    }
}