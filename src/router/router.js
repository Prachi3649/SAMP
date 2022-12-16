
const express = require ("express")
const router =  express.Router()

const usersController = require("../controller/uesrController")
const taskController = require('../controller/taskController')



// user
router.post("/register", usersController.register )



// client
router.post('/tasks/:id', taskController.createTasks)

router.get("/tasks",  taskController.getTask)

router.get("/tasks/createdDate",  taskController.getTaskByCreatedDate)

router.get("/tasks/updatedDate",  taskController.getTaskByUpdatedDate)

router.get("/tasks/status",  taskController.getTaskByStatus)

router.delete("/tasks/:userId/delete/:taskId",  taskController.taskDelete)

router.put("/tasks/update/:taskid" , taskController.updateTasks)


module.exports=router