import axios from "axios";

export const UserRegistration = (data) => {
  return axios
    .post("http://localhost:4000/registration/register", data, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
      },
    })
    .then((data) => data.status);
};
