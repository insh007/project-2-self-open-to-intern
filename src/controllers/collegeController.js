const  collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validation = require('../validation/validation')

const {isValidCollegeShortName, isValidCollegeFullName, isValidCollegeLogoLink ,isEmpty} = validation

const createCollege = async function(req,res){
    try{
        const {name , fullName, logoLink, isDeleted} = req.body
        
        /*------------------------Checking body is empty or not-----------------------------------*/
        if(Object.keys(req.body).length==0){return res.status(400).send({status:false,message:"Body is empty"})}
    
        /*------------------------Checking fileds are present or not-----------------------------------*/
        if(!name){return res.status(400).send({status:false,message:"name.... is required"})}
        if(!fullName){return res.status(400).send({status:false,message:"full name is required"})}
        if(!logoLink){return res.status(400).send({status:false,message:"logo link is required"})}
        if(isDeleted){return res.status(400).send({status:false, msg:"This must be false at the time of creation"})}

        /*------------------------Checking fileds values are empty or not-----------------------------------*/
        if(!(isEmpty(name))){return res.status(400).send({status:false,message:"Name is required....."})} 
        if(!(isEmpty(fullName))){return res.status(400).send({status:false,message:"Full Name is required"})}
        if(!(isEmpty(logoLink))){return res.status(400).send({status:false,message:"Logo link is required"})}
    
        /*------------------------Validation with regex-----------------------------------*/
        if(!(isValidCollegeShortName(name))){return res.status(400).send({status:false,message:"Please provide college name abbreviation in correct format"})}
        if(!(isValidCollegeFullName(fullName))){return res.status(400).send({status:false,message:"Please provide college full name in correct format"})}
        if(!(isValidCollegeLogoLink(logoLink))){return res.status(400).send({status:false,message:"Please provide logo link in correct format"})}

        /*-----------------------------------Duplicate Data Handle----------------------------------------*/
        const foundDuplicate = await collegeModel.findOne({name:name})
        if(foundDuplicate){return res.status(400).send({status:false, message:"This college is already registerd"})}

        /*-----------------------------------CREATING COLLEGE DATA----------------------------------------*/
        const createCollegeData = await collegeModel.create(req.body)
        res.status(201).send({status:true,data:createCollegeData})
    }
    catch(err){
        return res.status(500).send({status:true,message:err.message})
    }
}

const getCollegeDetail = async function(req,res){
    try{

        let collegeName = req.query.collegeName
        
        /*------------------------Checking query is present or not -----------------------------------*/
        if(!collegeName){return res.status(400).send({status:false, message:"Please provide college name in query"})}
    
        /*------------------------Validation with regex-----------------------------------*/
        if(!(isValidCollegeShortName(collegeName))){return res.status(400).send({status:false,message:"Please provide college name abbreviation in correct format"})}

        /*------------------------checking college present in DB or not-----------------------------------*/
        let collegeDetail = await collegeModel.findOne({name:collegeName})
        if(!collegeDetail){return res.status(404).send({status:false, message:"your collge is not registerd"})}
    
        /*------------------------fetching college Id-----------------------------------*/
        let getCollgeId = collegeDetail._id
    
        /*------------------------fetching interns details-----------------------------------*/
        let getInternsList = await internModel.find({collegeId:getCollgeId, isDeleted:false}).select({_id:1, name:1, email:1, mobile:1})
    
        if(getInternsList.length==0){return res.status(404).send({status:false, message:`No student from ${collegeName} is apply for internship`})}

        /*------------------------Creating an Object(to match response body)-----------------------------------*/       
        const collegeData = {name:collegeDetail.name, fullName:collegeDetail.fullName, logoLink:collegeDetail.logoLink}
    
        /*------------------------Adding new key to above object-----------------------------------*/
        collegeData.interns = getInternsList

        return res.status(200).send({status:true, data:collegeData})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }

}
module.exports.createCollege = createCollege
module.exports.getCollegeDetail = getCollegeDetail


// const crateData = async function(req,res){
//     const {name, mobile, email, collegeName} = req.body

//     const collegeDetail = await collegeModel.findOne({name:collegeName})
//     const collegeId = collegeDetail._id

//     req.body.collegeId = collegeId
//     const internCreate = await internModel.create(req.body)
// }