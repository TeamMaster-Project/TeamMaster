import React, { Component } from "react";
import auth from "../../services/authService";
import PreLoader from "../PreLoader/PreLoader";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/"; //Redirecting to home witha fullreload of the page
  }
  render() {
       return <PreLoader/>;
  }
}

export default Logout;
