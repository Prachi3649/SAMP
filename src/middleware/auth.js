

const jwt =  require("jsonwebtoken")

const authentication = async (req,res,next) => {

    let token = req.header("x-api-key")

   let decodedtoken = jwt.verify(token, "thisismysecrutekey");
   
   if (!decodedtoken) return res.status(400).send ({staus : false, message: "token is invalid"})

   //req.userid = decodedtoken.userid
   next()
}

module.exports.authentication = authentication