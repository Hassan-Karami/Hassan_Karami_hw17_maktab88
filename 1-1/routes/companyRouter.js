const express = require("express");
const router = express();
const {
  createCompany,
  getAllCompanies,
  deleteCompany,
  getSingleCompany,
  updateCompany,
} = require("../controllers/CompanyController");
const { route } = require("./employeeRouter");


router.get("/",getAllCompanies);
router.get("/:id",getSingleCompany)
router.post("/",createCompany);
router.delete("/",deleteCompany);
router.patch("/", updateCompany);









module.exports=router;