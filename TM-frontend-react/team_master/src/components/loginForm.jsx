import React from "react";
import Joi from "joi-browser"; //Joi for form validation library
import Form from "./common/form";

class LoginForm extends Form {
  /*We can do this same thing using auto focus
  username = React.createRef();
  componentDidMount() {
    this.username.current.focus();
  } 
  */
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    //Joi validate schema
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render() {
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
