const ProvinceOfIran= require("../data/provinces_of_Iran.json");
const mongoose = require("mongoose");
const Employee = require("./employeeModel")
const { Schema, model } = mongoose;

//make valid Provinces array
const validProvinces = [];
for(const province of ProvinceOfIran){
    validProvinces.push(province.name);
}

//SCHEMA FOR COMPANY
const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registration_number: {
      type: String,
      unique: true,
      validate: /^[0-9]{10}$/,
      required: true,
    },
    province: {
      type: String,
      enum: validProvinces,
      default: "Not_Set",
    },
    city: {
      type: String,
      validate: {
        validator: function (city) {
          const selectedProvince = this.province;
          const targetProvince = ProvinceOfIran.find(
            (province) => province.name === selectedProvince
          );

          if (!targetProvince) {
            return false;
          }

          return targetProvince.cities.includes(city);
        },
        message: "Invalid city for the selected province",
      },
    },

    phone_number: [
      {
        unique: true,
        type: String,
        required: true,
        // validate: /^0\d{2,3}-\d{7}$/,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "registrationDate",
      updatedAt: "updatedAt",
    },
  }
);


module.exports = model("Company", companySchema);


