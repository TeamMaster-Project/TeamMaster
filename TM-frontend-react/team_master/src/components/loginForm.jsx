import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser"; //Joi for form validation library
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    //Joi validate schema
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      //Handling login errors
      const { data } = this.state;
      await auth.login(data.username, data.password);

      //window.location = "/"; //full Reload and redirecting to get current user loged in
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/newproject"; //if the state is defined log in to where user want, if state not defined redirect to home page
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />; //Prevent go to 'login' again when a user already loged in.

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputs("username", "Username")}
          {this.renderInputs("password", "Password", "password")}
          {/* name label datatype */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
