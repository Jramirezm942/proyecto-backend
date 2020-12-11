const mongoose = require("mongoose")
//Schema = Schema
const {Schema} = mongoose;

const userSchema = new Schema(
{
    email:{
        type:String,
        required:[true,"Debes agregar un email"],
        validate:{
            message:"El email ya tiene una cuenta asociada",
            validator: async ( email ) => {
                const items = await mongoose.models["User"].count({email})
                return items < 1
            },
        },
    },
    role:{
        type:String,
        default:"USER",
        enum:["ADMIN","USER"],
    },
    password:{
        type:String,
        required:[true,"Debes agregar un password"],
    },
},
{timestamps:true}

);

module.exports = mongoose.model("User",userSchema)