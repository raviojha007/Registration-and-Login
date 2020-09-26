import React, { Component } from "react";
import Logout from "./Logout";

//import axios from "axios";

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      profile: "",
      data: JSON.parse(localStorage.getItem("data")),
    };
  }

  componentWillMount() {
    //console.log("componentWillMount");
    fetch("http://localhost:4000/registration/alldata", {
      headers: {
        token: JSON.parse(localStorage.getItem("token")),
        email: this.state.data.email,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          email: data.email,
          profile: data.profile,
        });
      });
    //console.log(this.state.msg);
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img
              style={{ width: "50px" }}
              src={`http://localhost:4000/upload/${this.state.profile}`}
              alt="..."
              class="img-thumbnail"
            />{" "}
            Users Profiles
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">{this.state.email}</li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <Logout />
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
