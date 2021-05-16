import React, { Component } from "react";
import "./index.css";
import TeamMasterImg from "../../assets/images/Logo/Success.jpg";
import Mihindu from "../../assets/images/Team/mihindu.jpg";
import Darshana from "../../assets/images/Team/Darshana.jpeg";
import PreLoader from "../PreLoader/PreLoader";

class ContactUs extends Component {
  state = {
              isLoading: false
      };

    async componentDidMount() {
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.setState({isLoading: false});
        },3000)
    };


  render() {
    if(this.state.isLoading)
      return <PreLoader/>

    return (
      <div class="about-section ">
      <div className="shadow-box" ></div>
                <div class="container py-5">
                    <div class="row">
                        <div class="col-md-7 col-sm-6">
                          <div class="about-title clearfix">
                              <h1>About <span>TeamMaster</span></h1>
                              <h3 className="font-weight-light">All in one project / team management platform </h3>
                              <p class="about-paddingB">
                                TeamMaster provides all kind of team engagement activities inside one single platform. 
                                We provide you to form projects and teams with your team mates and you will be able to manage a project management workspace / storyboard (kanban)
                                and you will be able to use chat room service to chat with the same particular team and also we provide video conferencing facility 
                                for your particular team to have your online meetings in a secure manner.
                              </p>
                              <p>
                                We are a group of Software Engineers from University of Kelaniya Sri Lanka, behind the success of this amazing platform
                              </p>

                                <h2 class="font-weight-light text-black mt-4">Meet the Team</h2>
                                <div className="container p-2">
                                       <div class="row">
                                            <div class="col-xl-3 col-md-6 mb-4">
                                                  <div class="card border-0 shadow">
                                                    <img src={Mihindu} class="card-img-top" alt="..." />
                                                    <div class="card-body text-center">
                                                      <h6 class="card-title mb-0">Mihindu</h6>
                                                      <div class="card-text text-black-50">Software Engineer</div>
                                                    </div>
                                                  </div>
                                            </div>

                                            <div class="col-xl-3 col-md-6 mb-4">
                                              <div class="card border-0 shadow">
                                                <img src="https://source.unsplash.com/9UVmlIb0wJU/500x350" class="card-img-top" alt="..." />
                                                <div class="card-body text-center">
                                                  <h6 class="card-title mb-0">Sanjula</h6>
                                                  <div class="card-text text-black-50">Software Engineer</div>
                                                </div>
                                              </div>
                                            </div>
                                         
                                            <div class="col-xl-3 col-md-6 mb-4">
                                              <div class="card border-0 shadow">
                                                <img src={Darshana} class="card-img-top" alt="..." />
                                                <div class="card-body text-center">
                                                  <h6 class="card-title mb-0">Darshana</h6>
                                                  <div class="card-text text-black-50">Software Engineer</div>
                                                </div>
                                              </div>
                                            </div>

                                            <div class="col-xl-3 col-md-6 mb-4">
                                              <div class="card border-0 shadow">
                                                <img src="https://source.unsplash.com/ZI6p3i9SbVU/500x350" class="card-img-top" alt="..." />
                                                  <div class="card-body text-center">
                                                    <h6 class="card-title mb-0">Kasun</h6>
                                                  <div class="card-text text-black-50">Software Engineer</div>
                                                </div>
                                              </div>
                                            </div>
                                       </div>
                                </div>
                              
                              <h1>
                              <div class="about-icons"> 
                                <ul >
                                    <li><a href="https://www.facebook.com/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a> </li>
                                    <li><a href="https://twitter.com/"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a> </li>
                                    <li> <a href="https://plus.google.com/"><i id="social-gp" class="fa fa-google-plus-square fa-3x social"></i></a> </li>
                                    <li> <a href="mailto:teammasterlk@gmail.com"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a> </li>
                                </ul>   
                              </div>
                              </h1>
                                <p className="text-center">Copyright @ 2021</p>                	        

                          </div>
                        </div>

                        <div class="col-md-5 col-sm-6">
                          <div class="pt-4 mt-3">
                              <img className="px-5 py-4 about-img" src={TeamMasterImg} alt=""></img>
                            <h5 className="font-weight-light">Join our success</h5>
                          </div>
                        </div>
                    </div>
                  </div>
      </div>
      
    );
  }
}

export default ContactUs;
