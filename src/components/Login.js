import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginService from "../services/LoginService";
import Message from "../elements/Message";
import Error from "../elements/Error";
import Logout from "./Logout";
import { withRouter } from "react-router";
import {
  COMMON_FIELDS,
  REGISTRATION_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from "../MessageBundle";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
      loginSuccess: false,
    };
  }

  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    if (!data.email || !data.password) {
      return;
    }
    const loginResult = await LoginService(data);
    if (loginResult.data.login === "success") {
      this.setState({
        error: false,
        loginSuccess: true,
      });
    } else
      this.setState({
        loginSuccess: false,
        error: true,
      });
    console.log(loginResult);
    localStorage.setItem("token", JSON.stringify(loginResult.data.token));
    localStorage.setItem("data", JSON.stringify(loginResult.data.userdata));
    this.props.history.push("/Profile");
  };

  render() {
    const { loginSuccess, error } = this.state;
    console.log(this.props);

    return (
      <div className="Login">
        <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1>{" "}
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
              <p> {COMMON_FIELDS.EMAIL} </p>{" "}
              <input
                type="text"
                name="email"
                onChange={this.handleOnChangeEmail}
                autoComplete="email"
                required
              />
            </div>{" "}
            <div className="fields">
              {" "}
              <p> {COMMON_FIELDS.PASSWORD} </p>{" "}
              <input
                type="password"
                name="password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
              />{" "}
            </div>{" "}
            <div className="buttons">
              {" "}
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary"
              >
                {" "}
                {LOGIN_FIELDS.LOGIN}{" "}
              </button>{" "}
              <Link to="/register">{REGISTRATION_FIELDS.REGISTER} </Link>{" "}
            </div>{" "}
          </div>{" "}
        </form>{" "}
        {loginSuccess && <Message message={LOGIN_MESSAGE} />}{" "}
        {error && <Error message={ERROR_IN_LOGIN} />}
      </div>
    );
  }
}
export default withRouter(Login);
