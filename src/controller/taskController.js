

const tasksModel = require("../model/taskModel")
const userModel = require("../model/userModel")



const createTasks = async function (req, res) {
    try{
    const data = req.body;

    const userId = req.params.id
    console.log(userId)

    const userDetails = await userModel.findById({ _id: userId, isDeleted: false })
   
    if (userDetails.role === 'admin' || userDetails.role === 'teamLead') {
        const { title, description, status, createdAt, updatedAt } = data

        if (!title) {
            return res.status(400).send({
                status: false,
                message: "Please provide title"
            })
        }

        if (!description) {
            return res.status(400).send({
                status: false,
                message: "Please provide description"
            })
        }

        if (!status) {
            return res.status(400).send({
                status: false,
                message: "Please provide status"
            })
        }

        const statusEnum = ['CREATED', 'IN_PROGRESS', 'DONE']
        if (!statusEnum.includes(status.trim())) {
            return res.status(400).send({ status: false, message: "enter currencyId format correct you can use ['INR' , 'USD' , 'EUR' ,] it is required" })
        }

        if (!createdAt) {
            return res.status(400).send({
                status: false,
                message: "Please provide createdAt"
            })
        }

        if (!updatedAt) {
            return res.status(400).send({
                status: false,
                message: "Please provide updatedAt"
            })
        }

        const create = await tasksModel.create(data);
        console.log(create)
        return res.status(201).send({
            status: true,
            message: "successfully Created Tasks",
            Data: create

        })
    } else {
        return res.status(403).send({
            status: true,
            message: "unAuthorized",
        })
    }
 }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }
}

//GET ALL TASK 

const getTask = async function (req, res) {
   
   try{ const user = req.body

    const tasks = await tasksModel.find({  isDeleted: false }).limit(10)
    if (tasks.length === 0) {
        return res.status(400).send({
            status: false,
            message: "Data not Found"
        })
    }
    res.status(200).send({ status: true, message: "successful", data: tasks })
  }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }
}


//get the tasks by created date

const getTaskByCreatedDate = async function (req, res) {
    try{
    const date = req.query.Date  //Date = "DD-MM-YYYY";
    console.log(date)

    if (!date) {
        return res.status(400).send({
            status: false,
            message: "please enter date"
        })
    }

    const data = await tasksModel.find({ createdAt: date, isDeleted: false })
    

    if (data.length === 0) {
        return res.status(400).send({
            status: false,
            message: "task not available"
        })
    }

    return res.status(200).send({
        status: true,
        message: "successful",
        data: data
    })
 }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }

}


//get the tasks by updated date

const getTaskByUpdatedDate = async function (req, res) {

  try{  
    const date = req.query.Date  //Date = "DD-MM-YYYY";

    if (!date) {
        return res.status(400).send({
            status: false,
            message: "please enter date"
        })
    }

    const data = await tasksModel.find({ updateAt: date, isDeleted: false })

    if (data.length === 0) {
        return res.status(400).send({
            status: false,
            message: "task not available"
        })
    }

    return res.status(200).send({
        status: true,
        message: "successful",
        data: data
    })
 }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }
}


//get the tasks by status

const getTaskByStatus = async function (req, res) {
  try{  const status = req.query.status

    if (!status) {
        return res.status(400).send({
            status: false,
            message: "please enter date"
        })
    }

    const data = await tasksModel.find({ status: status, isDeleted: false })
    if (!data.length === 0) {
        return res.status(400).send({
            status: false,
            message: "task not available"
        })
    }

    return res.status(200).send({
        status: true,
        message: "successful",
        data: data
    })
  }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }
}



const updateTasks = async function (req, res) {
  try{  const data = req.body
    console.log(data)

    const taskId  = req.params.id
    console.log(taskId)

    let updateTaskObj = {}

    const { title, description, status, } = data

    if (title) {
        updateTaskObj['title'] = title
    }

    if (description) {
        updateTaskObj['description'] = description
    }

    if (status) {
        const statusEnum = ['CREATED', 'IN_PROGRESS', 'DONE']
        if (!statusEnum.includes(status.trim())) {
            return res.status(400).send({ status: false, message: "enter  correct format you can use ['CREATED', 'IN_PROGRESS', 'DONE'] it is required" })
        }
        updateTaskObj['status'] = status
    }

    const updateTask = await tasksModel.findOneAndUpdate({ _id: taskId }, { $set: { updateTaskObj}  }, { new: true })
    console.log(updateTask)

    return res.status(200).send({
        status: true,
        message: "successful",
        Data: updateTask
    })

  }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }

}





const taskDelete = async function (req, res) {
    
 try{   //const data = req.body
    const {userId} = req.params
    console.log(userId)

    const taskId = req.params.taskId
    console.log(taskId)

    const userDetails = await userModel.findOne({ _id: userId, isDeleted: false })
    //console.log(userDetails)

    if (userDetails.role === 'admin') {
        const deleteTak = await tasksModel.findByIdAndUpdate({ _id: taskId }, { $set: { isDeleted: true } }, { new: true })
        return res.status(200).send({
            status: true,
            message: "successfully deleted"
        })
    } else {
        return res.status(403).send({
            status: true,
            message: "unAuthorized",
        })
    }



 }catch (err) {
    return res.status(500).send({
        status: false,
        Error: err.message
    })
 }
}

module.exports = {
    createTasks,
    getTask,
    getTaskByCreatedDate,
    getTaskByUpdatedDate,
    getTaskByStatus,
    taskDelete,
    updateTasks
}