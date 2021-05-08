import React from "react";
import Form from "../../Common/form";
import Joi from "joi-browser";
import * as userService from "../../../services/userService";
import auth from "../../../services/authService";
import "./index.css";
import { addUsers } from "../../../services/chatboxService";
import { toast } from "react-toastify";

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

  createUserInChatEngine = async (currentUser) => {
    try{
      await addUsers(currentUser);
    }catch(error){
      console.log(error);
      toast("User Registration Failed in ChatEngine")
    }
      
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);//Register user
      await this.createUserInChatEngine(response.data);//Register user in ChatEngine

      //Log in user soon after registration
      auth.loginWithJwt("token", response.headers["x-auth-token"]); //Store the token in localStorage when after creating a new user
      //Redirecting to main home page to get current user logged in
      //window.location = "/"; //full Reload and redirecting to homepage
      this.props.history.push("/newproject"); 
      toast("User Registered Successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        //Handle user already registered error
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
