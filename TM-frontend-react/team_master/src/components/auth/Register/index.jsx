import React from "react";
import Form from "../../Common/form";
import Joi from "joi-browser";
import * as userService from "../../../services/userService";
import auth from "../../../services/authService";
import "./index.css";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    //Joi validate schema
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().min(5).label("Name"),
  };

  doSubmit = async () => {
    //Call the server
    try {
      const response = await userService.register(this.state.data);
      console.log("Registered Successfully", response);
      //Log in user soon after registration

      auth.loginWithJwt("token", response.headers["x-auth-token"]); //Store the token in localStorage when after creating a new user
      this.props.history.push("/newproject"); //Redirecting to main home page to get current user loged in
      //window.location = "/"; //full Reload and redirecting to homepage
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //handle user already registered error
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="register-form-container">
        <div className="register-form-card">
          <div className="register-form">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInputs("username", "Email", "text")}
              {this.renderInputs("password", "Password", "password")}
              {/* name label datatype */}
              {this.renderInputs("name", "Name", "text")}
              <div className="form-submit-button">
                {this.renderButton("Register")}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
