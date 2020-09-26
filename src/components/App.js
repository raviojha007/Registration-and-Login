import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import ProfileComponent from "./ProfileComponent";
import { Protected } from "../ProtetedRoute/Protected";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: JSON.parse(localStorage.getItem("token")),
    };
  }

  render() {
    const { token } = this.state;
    console.log(token);
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/register"
              exact
              render={() =>
                token ? <Redirect to="/Profile" /> : <Registration />
              }
            />

            <Route exact path="/login" component={Login} />

            <Protected exact path="/Profile" component={ProfileComponent} />
            <Redirect from="/" to="login" />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
