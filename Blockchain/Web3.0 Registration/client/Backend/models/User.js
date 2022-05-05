const mongoose = require("mongoose");
const validator = require("validator")
const bcryptjs = require("bcryptjs")

const useSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    lname:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
    
})

// useSchema.pre("save",async function(next){
//     if (this.modified("password")){
//         const salt = await bcryptjs.genSalt(10);
//         this.password = await bcryptjs.hash(this.password,salt)
//         this.password = undefined;
//     }
//     next()
// })


const User = mongoose.model("first",useSchema);
module.exports = User

