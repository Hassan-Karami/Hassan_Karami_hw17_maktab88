const mongoose = require("mongoose");
const { Schema, model,SchemaTypes } = mongoose;
const Company = require("./companyModel")
employeeSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim:true
    },
    last_name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim:true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Not_Set"],
      default: "Not_Set",
    },

    birthday: {
      type: Date,
      required: true,
      trim: true,
    },
    phone_number: [
      { unique: true,type: String, required: true, validate: /^(\+98|0)?9\d{9}$/ },
    ],
    national_code: {
      required: true,
      unique: true,
      type: String,
      validate: /^[0-9]{10}$/,
    },
    province: {
      type: String,
      enum: [
        "Alborz",
        "Ardabil",
        "Bushehr",
        "Chaharmahal and Bakhtiari",
        "East Azerbaijan",
        "Isfahan",
        "Fars",
        "Gilan",
        "Golestan",
        "Hamedan",
        "Hormozgan",
        "Ilam",
        "Kerman",
        "Kermanshah",
        "Khuzestan",
        "Kohgiluyeh and Boyer-Ahmad",
        "Kurdistan",
        "Lorestan",
        "Markazi",
        "Mazandaran",
        "North Khorasan",
        "Qazvin",
        "Qom",
        "Razavi Khorasan",
        "Semnan",
        "Sistan and Baluchestan",
        "South Khorasan",
        "Tehran",
        "West Azerbaijan",
        "Yazd",
        "Zanjan",
        "Not_Set",
      ],
      default: "Not_Set",
    },
    company: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: Company
    
    },
    role: {
      type: String,
      enum: ["Employee", "Manager"],
      default: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Employee", employeeSchema);






