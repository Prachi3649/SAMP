
const express = require ("express")
const router =  express.Router()

const usersController = require("../controller/uesrController")
const clientController = require("../controller/clientController")
const Middle = require ("../middleware/auth")

// user
router.post("/register", usersController.register )
router.post ("/login" , usersController.login)


// client
router.post("/addclients",  clientController.addclients)
router.get("/viewClient", Middle.authentication, clientController.getClientBySpecific)



module.exports=router