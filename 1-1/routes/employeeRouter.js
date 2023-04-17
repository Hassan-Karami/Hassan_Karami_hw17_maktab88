const express = require("express");
const router = express();
const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getSingleEmployee,
} = require("../controllers/EmployeeController");

const {createEmployeeValidation,updateEmployeeValidation, deleteEmployeeValidation,getSingleEmployeeValidation} = require("../validation/employeeValidation")

//routes
// router.get("/",getSingleEmployeeWithQueryString)
router.get("/",getAllEmployees)
router.post("/getSingleEmployee",getSingleEmployeeValidation,getSingleEmployee)
router.post("/",createEmployeeValidation,createEmployee);
router.patch("/",updateEmployeeValidation,updateEmployee);
router.delete("/",deleteEmployeeValidation,deleteEmployee)


module.exports= router;