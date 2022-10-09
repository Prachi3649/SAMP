
const mongoose = require("mongoose")

const userSchema  = new mongoose.Schema({

    userName : {
        type : String,
        require : true,
        lowercase : true

    },
   
    emailId: {
        type: String,
         require: true,
        // unique: true,
        lowercase: true,
        trim: true
    },

    password : {
        type: String,
        require : true,
        
    },



} , { timestamps: true}) ;

module.exports = new mongoose.model( "usersModel" , userSchema)

