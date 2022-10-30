
const express = require ("express")
const router =  express.Router()

const usersController = require("../controller/uesrController")

const Middle = require ("../middleware/auth")

// user
router.post("/register", usersController.register )
router.post ("/login" , usersController.login)


// client

router.get("/view/:id", Middle.authorization, usersController.getUser)



module.exports=router