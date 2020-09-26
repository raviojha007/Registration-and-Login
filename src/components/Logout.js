import React, { Component } from "react";
import { withRouter } from "react-router";

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  logout = (e) => {
    e.preventDefault();

    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    localStorage.removeItem("token");
    localStorage.removeItem("data");

    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <button
          onClick={this.logout}
          type="button"
          className="btn btn-outline-success my-2 my-sm-0 "
        >
          Logout
        </button>
      </div>
    );
  }
}
export default withRouter(Logout);
