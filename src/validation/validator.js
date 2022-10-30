

const mongoose = require("mongoose")


const isValidObject = (data) => {
    if(Object.keys(data).length === 0){
    return false
   }
  return true

}

const isValid = (value) => {
    
        if (typeof value != 'string')   return false
           
        if (typeof value === 'undefined' || typeof value === "null")   return false
            
        if (typeof value === 'string' && value.trim().length == 0)    return false
           
        return true
}

const isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value)
}


const isValidEmail = (value) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim())
}

const isValidString = (value) => {
    return /^[a-zA-Z -]+$/.test(value)
}


const isValidPassword = (value) => {
    return /^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value.trim())
}



 

module.exports.isValidObject =isValidObject
module.exports.isValid = isValid
module.exports.isValidObjectId = isValidObjectId
module.exports.isValidEmail = isValidEmail
module.exports.isValidString = isValidString
module.exports.isValidPassword = isValidPassword

