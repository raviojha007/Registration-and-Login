let obj = require("./token");
let auth = (req, res, next) => {
  let allHeaders = req.headers;
  let a_token = allHeaders.token;
  // console.log("client  " + a_token + "  " + "server  " + obj.token);
  console.log(req.headers.email);
  if (a_token === obj.token) {
    next();
  } else {
    res.send({ message: "unauthorized user" });
  }
};
module.exports = auth;
