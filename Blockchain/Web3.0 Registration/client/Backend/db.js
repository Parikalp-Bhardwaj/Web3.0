const mongoose = require("mongoose");

const url ="mongodb://localhost:27017/dapp?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


const connectToMongo = () =>{
    mongoose.connect(url,()=>{
        console.log("Connection is Successful")
    })
}

module.exports = connectToMongo


