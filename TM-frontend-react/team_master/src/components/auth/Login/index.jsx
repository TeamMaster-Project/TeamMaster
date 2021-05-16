import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser"; //Joi for form validation library
import Form from "../../Common/form";
import auth from "../../../services/authService";
import { toast } from "react-toastify";
import Loader from "../../PreLoader/Loader";
import "./index.css";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
  };

  schema = {
    //Joi validate schema
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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
      //Handling login errors
      const { data } = this.state

      this.setState({isLoading: true});
      await auth.login(data.username, data.password);  
      const { state } = this.props.location;
      await this.setState({ isLoading: false, isSuccess: true });
      
      // window.location = "/"; //full Reload and redirecting to get current user loged in
      window.location = state ? state.from.pathname : "/newproject"; //if the state is defined log in to where user want, if state not defined redirect to home page
      toast("Successfully Logged in")
    } catch (ex) {
      this.setState({isLoading: false, isFail: true})
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      toast.error("Log in fail");
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />; //Prevent go to 'login' again when a user already loged in.
    
    return (
        <div class="container-fluid">
          <div class="row no-gutter">
            {/* left Half */}
            <div class="col-md-6 d-none d-md-flex bg-image"></div>

            {/* Right Half */}
            <div class="col-md-6 bg-light">
              <div class="login d-flex align-items-center py-5">
                  <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-4">TeamMaster</h3>
                            <h3 class="display-4 mb-5">Log In</h3>
                            <h6 class="text-muted mb-4">Enter your email and password</h6>

                            {this.state.isLoading ? ( 
                              <h6>Please wait...
                                  <Loader/>
                              </h6>
                              ) : null 
                            }
                            { !this.state.isLoading && this.state.isSuccess ? <h6 style={{color: 'green'}}>Log in success</h6>: null }
                            { !this.state.isLoading && this.state.isFail ? <h6 style={{color: 'red'}}>Log in fail</h6>: null }
      
                             <div className="register-form">
                               <form onSubmit={this.handleSubmit}>
                                 {this.renderInputs("username", "Email / Username")}
                                 {this.renderInputs("password", "Password", "password")}
                                 {/* name label datatype */}
                                 <div className="form-submit-button">
                                   {this.renderButton("Login")}
                                 </div>
                               </form>
                              </div>
                               <h6 class="text-muted mb-4"> Don't you have a TeamMaster account ? &nbsp;
                                  <Link
                                  to="/register"
                                  className="mb-4"
                                >
                                 <i>Create New Project</i>
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

export default LoginForm;
