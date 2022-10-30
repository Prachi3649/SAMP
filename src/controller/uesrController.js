

const userModel = require("../model/userModel")
const jwt  = require("jsonwebtoken")
const validators = require("../validation/validator")

const register  = async  (req,res) => {

  try{
    const data = req.body

    if(!validators.isValidObject(data)) {
        return res.status(400).send ({status: false, message: "Please provide Data"})
    }

     const {userName, emailId,password,role} = data


    // USER NAME
    if(!validators.isValid(userName)) {
     return res.status(400).send ({status : false, message: "Please provide user Name"})
    }

    
    // EMAIL ID
    if(!validators.isValid(emailId)) {
        return res.status(400).send ({status : false, message: "Please provide Email Id"})
    }
    if(!(validators.isValidEmail(emailId))) {
        return res.status(400).send ({status: false, message: "please provide valid eamil with sign"})
    }

    // PASSWORD
    if(!validators.isValid(password)){
        return res.status(400).send({status: false, message: "Please Provide Password"})
    }
    if(!validators.isValidPassword(password)) {
        return res.status(400).send ({status: false, message: "Please Provide Password length between 8 to 15"})
    }

    const uniqueUser = await userModel.findOne({userName : userName })
    if (uniqueUser) {
        return res.status(400).send ({ status:false, message: "please provide different user name it's already used " })
    }

    const uniqueEmail = await userModel.findOne({emailId : emailId })
    if (uniqueEmail) {
        return res.status(400).send ({ status:false, message: "please provide different Email Id it's already used" })
    }

    const user = await userModel.create(data)
    return  res.status(201).send ({status: true , message : "Created",  data:user})
  }catch (error) {
      return res.status(500).send ({status: false , message : error.message})
    }
}


// Login 
const login = async (req, res) => {
    try {
    const requestBody = req.body

    if( !validators.isValidObject(requestBody)) {
        return res.status(400).send ({status: false, message: "Please provide Data"})
    }

    const {emailId,password} = requestBody

    if(!validators.isValid(emailId)) {
        return res.status(400).send ({status : false, message: "Please provide emailId"})
    }

    if(!validators.isValid(password)) {
       return res.status(400).send({status: false, message: "Please Provide Password"})
    }

    

    const userlogin = await userModel.findOne({ emailId, password })
    //console.log(userlogin)
    if (!emailId || !password ) 
    return res.status(400).send({status : false, message:"emailId or password is not correct please provide correct and please check user role"})
    
    // this generate token
    let token = jwt.sign ({userName : userlogin._id }, "thisismysecrutekey" );
    
    // set the token in header
    res.setHeader("x-api-key", token)

   return res.status(200).send ({status : true, message : "Token Created" , userId : userlogin._id, data : token})

    
   
  }catch (error) {
    return res.status(500).send ({status: false , message : error.message})
  }
}

// GET USER

const getUser = async (req,res) => {

 try {
    const  data = req.params.id
    if( !validators.isValidObjectId(data)) {
        return res.status(400).send ({status: false, message: "Please provide correct user Id "})
    }
    
  if(data == req.verifyToken.userName) {
    
    const userDetails = await userModel.findById(data)
        
    if(userDetails.role == "admin" ) {
        const user = await userModel.find({ role : "user"})
     return res.status(200).send ({status: true, Data: user})

    }
    else { return res.status(401).send ({status: false, message : "user is Not authorize"})  }
  }
    else { return res.status(401).send ({status: false, message : "user is Not authorize"})  }

 }
 catch (err) {
    return res.status(500).send ({Error : err.message})
  }
}


module.exports.register = register
module.exports.login = login
module.exports.getUser = getUser




