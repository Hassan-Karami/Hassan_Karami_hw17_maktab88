const Company = require("../models/companyModel");
const Employee = require("../models/employeeModel");
const createError = require("http-errors");
const mongoose= require("mongoose");
const path= require("path");

//Get All Companies
const getAllCompanies = async(req,res,next)=>{
  try {
      const allCompanies = await Company.find({}, { __v: 0 });
      res.send(allCompanies);
  } catch (error) {
    console.log(error.message);
    next({
      status: 500,
      message: `${error.message}`,
    });
  }

}

//Get Single Company
const getSingleCompany = async (req,res,next)=>{
  const targetCompany = await Company.findById(req.params.id,{__v:0});
  if(!targetCompany){
    next({status:400,message: `company with id: ${req.params.id} doesnt exist`});
  }
  console.log(targetCompany);
  res.send(targetCompany)
}

//Create New Company
const createCompany = async(req,res,next)=>{
    
        const newCompany = new Company({
          name: req.body.name,
          registration_number: req.body.registration_number,
          province: req.body.province,
          city: req.body.city,
        });
        newCompany
          .save()
          .then((createdCompany) => {
            res.status(201).send(createdCompany);
          })
          .catch((error) => {
            console.log(error.message);
            next({
              status: 500,
              message: `${error.message}`,
            });
          });
}


//Delete Company
const deleteCompany = async(req,res,next)=>{
try {
  const id = new mongoose.Types.ObjectId(req.body.id);
  const deletedCompany= await Company.findByIdAndDelete(id,{new:true});
  if(!deletedCompany){
    return next({ status: 400, message: "this company does not exist" });
  }
  res.send(deletedCompany);
} catch (error) {
    console.log(error.message);
    next({
      status: 500,
      message: `${error.message}`,
    });
  
}
}

//Update Company
const updateCompany = async (req,res,next)=>{
  const targetCompany = await Company.findById(req.body._id);
  if(!targetCompany){
    return next({status:400, message:"this company does not exist"})
  }
   const updateBody = {};
   const { name, registration_number, province, city , _id } = req.body;
   if (!!name) updateBody.name = name;
   if (!!registration_number)
     updateBody.registration_number = registration_number;
   if (!!province) updateBody.province = province;
   if (!!city) updateBody.city = city;
   
   const updatedCompany = await Company.findOneAndUpdate({_id}, updateBody , {new: true,runValidators:true});
   res.send(updatedCompany);
  
 
}


module.exports = {
  createCompany,
  getAllCompanies,
  deleteCompany,
  getSingleCompany,
  updateCompany,
};