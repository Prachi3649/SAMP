
const mongoose = require ("mongoose")



const taskSchema  = new mongoose.Schema ( {

   
    
    title: {
        type : String,
        require :true
    },

    description: {
        type : String,
        require :true

    },

    status: {
        type: String,
        enum : ['CREATED', 'IN_PROGRESS', 'DONE'],
        require :true
    },
    // role : {
    //     type :String,
    //     require :true,

    // }

    isDeleted:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type: String,
        require :true
    },

    updatedAt:{
        type: String,
        require :true
    }

    
})

module.exports = new mongoose.model( "task", taskSchema)