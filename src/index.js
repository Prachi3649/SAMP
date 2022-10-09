

const express =  require ("express")
const app = express()

const bodyParser = require ("body-parser")
app.use (bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const multer = require("multer")
app.use(multer().any())


const router = require("./router/router")
app.use("/" , router)

const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://pankaj:XHR0F0IrqL14JxKZ@cluster0.ajtoy.mongodb.net/vouch-DB',{useNewUrlParser:true})
.then( () =>console.log("mongoose is contected..."))
.catch( err => console.log(err))



app.listen (process.env.port || 3000 ,  () => {
    console.log ("Express is connected 3000")
})