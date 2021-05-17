import React from "react";
import Form from "../../Common/form";
import Joi from "joi-browser";
import * as userService from "../../../services/userService";
import auth from "../../../services/authService";
import "./index.css";
import { addUsers } from "../../../services/chatboxService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../PreLoader/Loader";
import Logo from "../../../assets/images/Logo/TMLogo1.png"


class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
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

  async componentDidMount() {
      if(this.props.data)
        this.setState({data: this.props.data})

      this.setState({isLoading: true});
        setTimeout(()=>{
            this.setState({isLoading: false});
        },2000)
  }

  doSubmit = async () => {
    try {
      this.setState({isLoading: true})
      const response = await userService.register(this.state.data);//Register user
      await this.createUserInChatEngine(response.data);//Register user in ChatEngine

      //Log in user soon after registration
      //Redirecting to main home page to get current user logged in
      auth.loginWithJwt("token", response.headers["x-auth-token"]); //Store the token in localStorage when after creating a new user
      //window.location = "/"; //full Reload and redirecting to homepage
      this.setState({isLoading: false, isSuccess: true})
      this.props.history.push("/newproject"); 
      toast("User Registered Successfully");
    } catch (ex) {
      this.setState({isLoading: false, isFail: true})
      if (ex.response && ex.response.status === 400) {
        //Handle user already registered error
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("Registration fail");
      }
    }
  };
  render() {

    return (
      <div class="container-fluid">
          <div class="row no-gutter">
            {/* left Half */}
            <div class="col-md-6 d-none d-md-flex bg-image-register"></div>

            {/* Right Half */}
            <div class="col-md-6 bg-light">
              <div class="login d-flex align-items-center py-5">
                  <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3><img src={Logo} width="110px" height="100px"/></h3>
                            <h3 class="display-4">Get an account</h3>
                            <h6 class="text-muted mb-4">Enter your email and password</h6>
                            {this.state.isLoading ? ( 
                              <h6>Please wait...
                                  <Loader/>
                              </h6>
                              ) : null 
                            }
                            { !this.state.isLoading && this.state.isSuccess ? <h6 style={{color: 'green'}}>Registration success</h6>: null }
                            { !this.state.isLoading && this.state.isFail ? <h6 style={{color: 'red'}}>Registration fail</h6>: null }
                             <div className="register-form">
                               <form onSubmit={this.handleSubmit}>
                                  {this.renderInputs("username", "Email / Username", "text")}
                                  {this.renderInputs("password", "Password", "password")}
                                  {/* name label datatype */}
                                  {this.renderInputs("name", "Name", "text")}
                                  <div className="form-submit-button">
                                    {this.renderButton("Register")}
                                  </div>
                                </form>
                              </div>
                               <h6 class="text-muted mb-4"> Already have an account ? &nbsp;
                                  <Link
                                  to="/login"
                                  className="mb-4"
                                >
                                 <i>Log in</i>
                                </Link>
                               </h6>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Register;
