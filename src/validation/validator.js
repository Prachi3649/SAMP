

const mongoose = require("mongoose")
const clientModel = require("../model/clientModel")

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

const isValidBusinessCategory = (value) => {
    let enumValue = ["Automotives", "Technology", "Business Support" ,"Education","Health & Medicine"]
    for (let i of value) {
        if (enumValue.includes(x)== false) 
        return false
    }
    return true
}


const isValidEmail = (value) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim())
}

const isValidString = (value) => {
    return /^[a-zA-Z -]+$/.test(value)
}

const isValidPincode = (value) =>{
    return /^[1-9][0-9]{5}$/.test(value)
}

const isValidPhone = (value) => {
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)
}

const isValidPassword = (value) => {
    return /^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value.trim())
}

const isValidGstNumber = (value) => {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)
}

 

module.exports.isValidObject =isValidObject
module.exports.isValid = isValid
module.exports.isValidBusinessCategory = isValidBusinessCategory
module.exports.isValidObjectId = isValidObjectId
module.exports.isValidEmail = isValidEmail
module.exports.isValidString = isValidString
module.exports.isValidPincode = isValidPincode
module.exports.isValidPhone = isValidPhone
module.exports.isValidPassword = isValidPassword
module.exports.isValidGstNumber = isValidGstNumber
