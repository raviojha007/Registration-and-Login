import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import classNames from "classnames";
import { UserRegistration } from "../services/RegistrationService";
import Message from "../elements/Message";
import Error from "../elements/Error";
import axios from "axios";
import {
  REGISTRATION_FIELDS,
  REGISTRATION_MESSAGE,
  COMMON_FIELDS,
  ERROR_IN_REGISTRATION,
} from "../MessageBundle";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      hobbies: "",
      MobileNumber: "",
      password: "",
      cpassword: "",
      gender: "",
      profile: "",
      register: false,
      error: false,
    };
    console.log(this.props);
  }

  //file Upload

  fileChangedHandler = (event) => {
    this.setState({ profile: event.target.files[0] });
  };

  uploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", this.state.profile);
    formData.append("full_name", this.state.full_name);
    formData.append("gender", this.state.gender);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("hobbies", this.state.hobbies);
    formData.append("MobileNumber", this.state.MobileNumber);

    // const data = {
    //   full_name: this.state.full_name,
    //   email: this.state.email,
    //   MobileNumber: this.state.MobileNumber,
    //   hobbies: this.state.hobbies,
    //   password: this.state.password,
    //   cpassword: this.state.cpassword,
    //   gender: this.state.gender,
    //   profile: this.state.profile,
    // };
    console.log(this.state);
    if (this.state.password !== this.state.cpassword) {
      this.setState({
        register: false,
        error: true,
      });
      return;
    }

    const registerStatus = await UserRegistration(formData);
    if (registerStatus === 200) {
      this.setState(
        {
          full_name: "",
          email: "",
          hobbies: "",
          password: "",
          cpassword: "",
          gender: "",
          profile: "",
          MobileNumber: "",
          register: true,
          error: false,
        },
        () => this.props.history.push("/")
      );
    } else
      this.setState({
        error: true,
        register: false,
      });
    console.log(registerStatus);
  };

  handleOnChangeFullName = (e) => {
    this.setState({
      full_name: e.target.value,
    });
  };
  handleOnChangeMobile = (e) => {
    this.setState({
      MobileNumber: e.target.value,
    });
  };

  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleOnChangeHobbies = (e) => {
    this.setState({
      hobbies: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleOnChangeCPassword = (e) => {
    this.setState({
      cpassword: e.target.value,
    });
  };
  handleOnChangeGender = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  // handleOnBlur = async (e) => {
  //   this.setState({
  //     full_name: e.target.value,
  //   });
  //   const data = {
  //     full_name: this.state.full_name,
  //   };
  //   const isUsernameTaken = await UsernameValidation(data);

  //   isUsernameTaken === 204
  //     ? this.setState({ full_name_taken: true })
  //     : this.setState({ full_name_taken: false });
  // };

  // onSubmit = async (e) => {
  //   e.preventDefault();
  //   this.uploadHandler();

  // };

  render() {
    const { register, error, user_name_taken } = this.state;

    return (
      <div className="Registration">
        <h1> {REGISTRATION_FIELDS.REGISTRATION_HEADING} </h1>{" "}
        <form onSubmit={this.uploadHandler}>
          <div>
            <div className="fields">
              <p> {REGISTRATION_FIELDS.FULL_NAME} </p>{" "}
              <input
                type="text"
                value={this.state.full_name}
                name="full_name"
                onChange={this.handleOnChangeFullName}
              />{" "}
            </div>{" "}
            <div className="fields">
              <p> {REGISTRATION_FIELDS.EMAIL} </p>{" "}
              <input
                type="text"
                value={this.state.last_name}
                name="email"
                onChange={this.handleOnChangeEmail}
              />{" "}
            </div>{" "}
            <div className="fields">
              <p> {REGISTRATION_FIELDS.MOBILE} </p>{" "}
              <input
                type="number"
                value={this.state.MobileNumber}
                name="MobileNumber"
                onChange={this.handleOnChangeMobile}
              />{" "}
            </div>{" "}
            <div className="fields">
              <p> {REGISTRATION_FIELDS.HOBBIES} </p>{" "}
              <input
                type="checkbox"
                className={classNames({ error: user_name_taken })}
                value="Coder"
                name="hobbies"
                // onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeHobbies}
                required
              />{" "}
              Coder
            </div>{" "}
            <div className="fields">
              <p> {REGISTRATION_FIELDS.GENDER} </p>{" "}
              <input
                type="radio"
                className={classNames({ error: user_name_taken })}
                value="Male"
                name="gender"
                // onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeGender}
                required
              />
              Male
              {"    "}
              <input
                type="radio"
                className={classNames({ error: user_name_taken })}
                value="Female"
                name="gender"
                // onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeGender}
                required
              />{" "}
              Female
            </div>{" "}
            <div className="fields">
              <p> {REGISTRATION_FIELDS.PROFILE} </p>
              <input type="file" onChange={this.fileChangedHandler} />
            </div>
            <div className="fields">
              <p> {COMMON_FIELDS.PASSWORD} </p>{" "}
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
              />
            </div>{" "}
            <div className="fields">
              <p> {REGISTRATION_FIELDS.CPASSWORD} </p>{" "}
              <input
                type="password"
                value={this.state.cpassword}
                name="cpassword"
                onChange={this.handleOnChangeCPassword}
                autoComplete="cpassword"
                required
              />
            </div>{" "}
            <div className="buttons">
              <button
                type="submit"
                className="btn btn-primary"
                // disabled={user_name_taken}
              >
                {" "}
                {REGISTRATION_FIELDS.REGISTER}{" "}
              </button>{" "}
              <Link to="/login"> {REGISTRATION_FIELDS.CANCEL} </Link>{" "}
            </div>{" "}
          </div>{" "}
        </form>{" "}
        {error && <Error message={ERROR_IN_REGISTRATION} />}{" "}
        {register && <Message message={REGISTRATION_MESSAGE} />}{" "}
      </div>
    );
  }
}
export default withRouter(Registration);
