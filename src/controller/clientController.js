

const { response } = require("express")
const { findOne } = require("../model/clientModel")
const clientModel = require ("../model/clientModel")
const validators = require ("../validation/validator")


// ADD CLIENT

const addclients = async (req,res) => {

    try {
    const data = req.body
    
    

    if( !validators.isValidObject(data)) {
        return res.status(400).send ({status: false, message: "Please provide Data"})
    }

    const {companyName, businessCategory,emailAddress, state,gstNumber,selectFacilityManagementCompany, phoneNumber, contactPerson,city, pincode } = data
    


    if(!validators.isValid(companyName)) {
        return res.status(400).send ({status : false, message: "Please provide companyName"})
    }


    // Bussiness
    if(!validators.isValid(businessCategory)) {
        console.log(businessCategory)
        return res.status(400).send ({status : false, message: `Please provide business Category `})
    }

    let givenBussinessCategory = ["Automotives", "Technology", "Business Support" ,"Education","Health & Medicine"]
    for (let i of givenBussinessCategory)
       if (!givenBussinessCategory.includes(i)) 
    return res.status(400).send ({status : false, message: `Please select business Category in ["Automotive", "Technology", "BusinessSupport" , "Education", Health & Medicine ]`})



   // Email
    if(!validators.isValid(emailAddress)) {
        return res.status(400).send ({status : false, message: "Please provide emailAddress"})
    }
    if(!(validators.isValidEmail(emailAddress))) {
        return res.status(400).send ({status: false, message: "please provide valid eamil with sign"})
    }
    


    // state
    if(!validators.isValid(state)) {
        return res.status(400).send ({status : false, message: "Please provide state "})
    }
    let givenState = ["UttarPradesh","Gujarat","Haryana","Karnataka","Maharashtra","Telangana"]
    for (let i of givenState)
       if (!givenState.includes(i)) 
    return res.status(400).send ({status : false, message: `Please select state in ["UttarPradesh","Gujarat","Haryana","Karnataka","Maharashtra","Telangana"]`})



    // GST Number
    if(!validators.isValid(gstNumber)) {
        return res.status(400).send ({status : false, message: "Please provide gstNumber "})
    }
    if(!validators.isValidGstNumber(gstNumber)) {
        return res.status(400).send ({status : false, message: "Please provide gstNumber in that format 2 numbers (between 0-9) and then 5 character (between A-Z) 4 numbers (between 0-9) 1 character (between A-Z) 1 character (between 1-9 or A-Z)  1 character (between 0-9 or A-Z) "})
    }
    const isGstNumberUse = await clientModel.findOne({gstNumber: gstNumber})
    if(isGstNumberUse) {
      return res.status(400).send({status:false, message: "GST number already exist please provide different GST number"})
    }


   //  selectFacilityManagementCompany
    if(!validators.isValid(selectFacilityManagementCompany)) {
        return res.status(400).send ({status : false, message: "Please provide selectFacilityManagementCompany.."})
    }
    let givenSelectFacilityManagementCompany = ["wipro", "Infosys", "Accenture", "Capgemini", "Lodha", "Tata Consultancy Services", "HCL", "Redington", "Mphasis", "Larsen & Toubro"]
    for (let i of givenSelectFacilityManagementCompany)
       if (!givenSelectFacilityManagementCompany.includes(i)) 
    return res.status(400).send ({status : false, message: `Please select state in ["wipro", "Infosys", "Accenture", "Capgemini", "Lodha", "Tata Consultancy Services", "HCL", "Redington", "Mphasis", "Larsen & Toubro"]`})

    // Phone number
    if(!validators.isValid(phoneNumber)) {
        return res.status(400).send ({status : false, message: "Please provide phoneNumber "})
    }
    if(!validators.isValidPhone(phoneNumber)) {
        return res.status(400).send ({status : false, message: "Please provide 10 digit phoneNumber and Phone Number Start with 9,8,7 "})
    }
    const isPhoneInUse = await clientModel.findOne({phoneNumber: phoneNumber})
      if(isPhoneInUse) {
        console.log(isPhoneInUse)
        return res.status(400).send({status:false, message: "phone number already registered, enter different number............"})
    }


    // contact Person
    if(!validators.isValid(contactPerson)) {
        return res.status(400).send ({status : false, message: "Please provide contactPerson"})
    }
    if(!validators.isValidString(contactPerson)) {
        return res.status(400).send ({status : false, message: "Please provide contact Person Name not Number "})
    }


    //city
    if(!validators.isValid(city)) {
        return res.status(400).send ({status : false, message: "Please provide city "})
    }
    let givenCity =  ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Surat", "Vadodara",
    "Gurgaon", "Panipat", "Bangalore", "Mysore", "Mumbai", "Pune", "Nagpur", "Thane", "Hyderabad"]

    for (let i of givenCity)
       if (!givenCity.includes(i)) 
    return res.status(400).send ({status : false, message:  `Please select state in ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Surat", "Vadodara", "Gurgaon", "Panipat", "Bangalore", "Mysore", "Mumbai", "Pune", "Nagpur", "Thane", "Hyderabad"]`})


    // Pincode
    if(!validators.isValid(pincode)) {
        return res.status(400).send ({status : false, message: "Please provide  pincode"})
    }
    if(!validators.isValidPincode(pincode)){
        return res.status(400).send({status: false, message: "please enter 6 length pincode"})
    }


    const client = await clientModel.create(data)
    return res.status(201).send({status : true, message: "Created Client", Data: client})
   }
  catch (error) {
    return res.status(500).send ({status: false, message: error.message})

  }

}

// GET
const getClientBySpecific = async (req,res) => {
   try {
    
    const query = req.query
     
     const filterQuery = {} 

     if( !validators.isValidObject(query)) {
        return res.status(400).send ({status: false, message: "Please provide Data"})
    }

    //companyName
    if ( req.query.companyName ) {
        filterQuery["companyName"] = req.query.companyName
    }
    
    // Email
    if(req.query.emailAddress){
      filterQuery["emailAddress"] = req.query.emailAddress
    }
    
    //Phone Number
    if (req.query.phoneNumber){
    filterQuery["phoneNumber"] = req.query.phoneNumber
   }

   //Contact Person
   if(req.query.contactPerson) {
    filterQuery["contactPerson"] = req.query.contactPerson
   }

  const getClient = await clientModel.find(filterQuery)
    if (getClient.length === 0) {
        return res.status(404).send ({message: "DATA NOT FOUND"})
    }
    return res.status(200).send({status : true, message:"GET DATA", Data: getClient})
  }
  catch (error) {
    return res.status(500).send ({status: false , message : error.message})
  }
}  




 module.exports.addclients = addclients
 module.exports.getClientBySpecific= getClientBySpecific