const express = require("express");
const registrationRoutes = express.Router();
const bcrypt = require("bcryptjs");
let auth = require("./config/auth");
let Registration = require("./schema/User");
let RouteNames = require("./constants/constants");
let generateToken = require("./config/generateToken");
let obj = require("./config/token");

let multer = require("multer");

//file upload  using multer
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/upload");
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//NOTE  Registration route
registrationRoutes
  .route(RouteNames.register)
  .post(upload.single("profile"), async function(req, res) {
    const {
      full_name,
      email,
      gender,
      hobbies,
      MobileNumber,
      profile,
    } = req.body;
    const { filename } = req.file;
    console.log(req.file);
    let user = await Registration.findOne({ email });
    if (user) throw Error("user already ");
    let password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    password = hash;
    let newUser = await new Registration({
      full_name,
      email,
      password,
      gender,
      hobbies,
      profile: filename,
      MobileNumber,
    });

    let userReg = await newUser.save();
    res.send(userReg);
  });

// Login Router
registrationRoutes.route(RouteNames.login).post(async function(req, res) {
  const user = await Registration.findOne({ email: req.body.email });
  //console.log("User from login", user);
  try {
    if (!user) throw Error("User Does not exist");
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch);
    if (!isMatch) throw Error("Invalid credentials");

    let token = generateToken(
      {
        full_name: req.body.uname,
        password: user.password,
      },
      "raviojha@797979"
    );
    if (!token) throw Error("Couldnt sign the token");
    obj.token = token;
    res.send({
      login: "success",
      token: token,
      userdata: {
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (e) {
    res.status(401).send({ msg: e.message });
  }
});

// Get  login userData
registrationRoutes.route(RouteNames.data).get([auth], async function(req, res) {
  const user = await Registration.findOne({ email: req.headers.email });
  console.log(req.headers.email);
  res.json({
    email: user.email,
    profile: user.profile,
  });
});

module.exports = registrationRoutes;
