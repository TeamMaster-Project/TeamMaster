import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser"; //Joi for form validation library
import Form from "../../Common/form";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import PreLoader from "../../PreLoader/PreLoader";
import "./index.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    isLoading: false
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

      this.setState({isLoading: true})
      await auth.login(data.username, data.password);
      this.setState({isLoading: false})

      //window.location = "/"; //full Reload and redirecting to get current user loged in
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/newproject"; //if the state is defined log in to where user want, if state not defined redirect to home page
      toast("Successfully Logged in")
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
    if(this.state.isLoading){
      return <PreLoader/>
    }
    return (
      <div className="register-form-container">
        <div className="register-form-card">
          <div className="register-form">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInputs("username", "Username")}
              {this.renderInputs("password", "Password", "password")}
              {/* name label datatype */}
              <div className="form-submit-button">
                {this.renderButton("Login")}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
