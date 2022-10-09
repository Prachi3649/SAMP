

const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema ({
   
    companyName :{
        type : String,
        require: true,
        //unique: true
    },

    businessCategory : {
        require: true,
        type : [String],
        enum : ["Automotives", "Technology", "Business Support" ,"Education","Health & Medicine"] 
    },

    emailAddress : {
        type : String,
        require: true,
        //unique: true
    },

    state : {
        require: true,
        type : [String],
        enum : ["UttarPradesh","Gujarat","Haryana","Karnataka","Maharashtra","Telangana"]
    },
   
   gstNumber : {
    type : String,
    require: true,
   },

   webSite : {
    type : String,
    
   },

   selectFacilityManagementCompany : {
    type : String,
    require: true,
    enum : ["wipro", "Infosys", "Accenture", "Capgemini", "Lodha", "Tata Consultancy Services", "HCL", "Redington", "Mphasis", "Larsen & Toubro"]
   },


    phoneNumber : {
        type : Number,
        require: true,
    },

    contactPerson :{
        type : String,
        require: true,
    },

    city : {
        type : String,
        require: true,
        enum : ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Surat", "Vadodara",
        "Gurgaon", "Panipat", "Bangalore", "Mysore", "Mumbai", "Pune", "Nagpur", "Thane", "Hyderabad"]
    },

    pincode : {
        type : Number,
        require: true,
    },
    
    faxNumber : {
        type : String,
       
    }
    
}, {timestamps:true} )

module.exports =  mongoose.model ("client", clientSchema)




