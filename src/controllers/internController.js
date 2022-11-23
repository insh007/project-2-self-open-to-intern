const  collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validation = require('../validation/validation')

const {isValidStudentName, isValidCollegeShortName ,isValidMail, isValidMobile ,isEmpty} = validation

const createStudent = async function(req,res){
    try{
        const data = req.body
        const {name, email, mobile, collegeName ,isDeleted} = data
    
        /*------------------------Checking body is empty or not-----------------------------------*/
        if(Object.keys(req.body).length==0){return res.status(400).send({status:false,message:"Body is empty"})}
    
        /*------------------------Checking fileds are present or not-----------------------------------*/
        if(!name){return res.status(400).send({status:false,message:"full name is required"})}
        if(!email){return res.status(400).send({status:false,message:"email is required"})}
        if(!mobile){return res.status(400).send({status:false,message:"mobile is required"})}
        if(!collegeName){return res.status(400).send({status:false,message:"college name is required"})}
        if(isDeleted){return res.status(400).send({status:false, msg:"This must be false at the time of creation"})}
    
        /*------------------------Checking fileds values are empty or not-----------------------------------*/
        if(!(isEmpty(name))){return res.status(400).send({status:false,message:"Name is required"})}
        if(!(isEmpty(email))){return res.status(400).send({status:false,message:"email is required"})}
        if(!(isEmpty(mobile))){return res.status(400).send({status:false,message:"mobile number  is required"})}
        if(!(isEmpty(collegeName))){return res.status(400).send({status:false,message:"college name is required"})}
    
        /*------------------------Validation with regex-----------------------------------*/
        if(!(isValidStudentName(name))){return res.status(400).send({status:false,message:"please provide your name in correct format"})}
        if(!(isValidMail(email)))return res.status(400).send({status:false,message:"email format is Wrong"})
        if(!(isValidMobile(mobile)))return res.status(400).send({status:false,message:"mobile number format is Wrong"})
        if(!(isValidCollegeShortName(collegeName))){return res.status(400).send({status:false,message:"Please provide college name abbreviation in correct format"})}
    
        /*-----------------------------------Duplicate Data Handle----------------------------------------*/
        let foundDuplicateEmail = await internModel.findOne({email:email})
        if(foundDuplicateEmail){return res.status(400).send({status:false, message:"email already registerd"})}

        let foundDuplicateMobile = await internModel.findOne({mobile:mobile})
        if(foundDuplicateMobile){return res.status(400).send({status:false, message:"mobile number already registerd"})}
        
        /*-----------------------------------fetching college Details----------------------------------------*/
        let collegeDetail = await collegeModel.findOne({name:collegeName})
    
        if(!collegeDetail){return res.status(400).send({status:false, msg:"Your College is not registered"})}
    
        /*------------------------Adding new key to request body & fetching college ID from collegeDetail-----------------------------------*/
        data.collegeId = collegeDetail._id
    
        /*-----------------------------------CREATING INTERN-----------------------------------------------------*/
        const internCreate = await internModel.create(data)
        return res.status(201).send({status:true,data:internCreate})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports.createStudent = createStudent