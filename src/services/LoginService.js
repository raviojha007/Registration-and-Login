import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const LoginService = (data) =>
  axios
    .post("http://localhost:4000/registration/login", data, config)
    .then((res) => res);

export default LoginService;
