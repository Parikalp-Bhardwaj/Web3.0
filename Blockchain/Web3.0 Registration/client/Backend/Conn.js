const express = require("express")
const app = express()

const router = express.Router()
const connectToMongo = require("./db")

const User = require("./models/User")

const bodyParser = require("body-parser");


const bcryptjs = require("bcryptjs");



connectToMongo();

app.use(bodyParser.json())

router.get("/get",(req,res)=>{
    res.json("Hello")
})

router.post("/register",async(req,res)=>{

    let email = req.body.email
    const userExits = await User.findOne({email});
    if(userExits){
        return res.status(500).json({message: "Email already registered"})
        throw new Error('Username already used')
    }
    
    const genSalt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(req.body.password,genSalt)
    
    const user = await User({
        
        name:req.body.name,
        lname:req.body.lname,
        email:req.body.email,
        password:secPass,
        cpassword:secPass
    }) 

    user.save().then((result)=>{
        console.warn("result",result)
        res.status(200).json(result)
    }).catch((err)=>{console.log(err)})
})



app.use("/",router)
app.listen(5000)


