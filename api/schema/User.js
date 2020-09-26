const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SECTION  collection and schema for Registration
let UserSchema = new Schema({
  full_name: {
    type: String,
    required: [true, "can't be blank"],
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
  },
  hobbies: {
    type: String,
    required: [true, "can't be blank"],
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profile: {
    type: String,
  },
  MobileNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("UserData", UserSchema);
