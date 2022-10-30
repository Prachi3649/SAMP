

const jwt =  require("jsonwebtoken");
const userModel = require("../model/userModel");

const authentication = async (req,res,next) => {

   let token = req.header("x-api-key")

  let decodedtoken = jwt.verify(token, "thisismysecrutekey");
  
  if (!decodedtoken) return res.status(400).send ({staus : false, message: "token is invalid"})

 
  next()
}

// authorization

const authorization = async (req,res,next) => {
  
   try {
   const  token = req.header('x-api-key')
   
   if (token){
      const verifyToken = jwt.verify(token, "thisismysecrutekey")
       req.verifyToken = verifyToken

       next() 
   }
   else {
      return res.status(401).send({ERROR:"Token Missing"})
   }
 
  }
  catch (err) {
   return res.send ({error : err.message})
  }
 
}

module.exports.authentication = authentication
module.exports.authorization = authorization
