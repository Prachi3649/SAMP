
const mongoose = require("mongoose")

const userSchema  = new mongoose.Schema({

    userName : {
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
    role : {
        type: [String],
        enum: ["user", "admin"],
        default: "user",
    },

} , { timestamps: true}) ;

module.exports = new mongoose.model( "usersModel" , userSchema)

