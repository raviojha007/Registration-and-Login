const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let Registration = require("./schema/User");
var path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");

const registrationRoutes = require("./route");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/registration", registrationRoutes);

module.exports = app;
