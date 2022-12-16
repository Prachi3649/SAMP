
const mongoose = require("mongoose")

const userSchema  = new mongoose.Schema({

    name : {
        type : String,
        require : true,
        lowercase : true,
        require: true

    },
   
    emailId: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password : {
        type: String,
        require : true,
        
    },
    profilePic: {
        type: String,
        require : true
    },
    role : {
        type: String,
        enum: ["admin", "teamLead", "developer"],
        
    },

} , { timestamps: true}) ;

module.exports = new mongoose.model( "user" , userSchema)

