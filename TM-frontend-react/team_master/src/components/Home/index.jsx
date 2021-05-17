import React, { Component } from "react";
import {
  Container, Row, Col, Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem, UncontrolledCarousel
} from "reactstrap"
import "./index.css";
import Images from "../../assets/images"
import ChatRoomScreenshot from "../../assets/images/Screenshots/Capture1.PNG"
import VideoRoomScreenshot from "../../assets/images/Screenshots/Capture5.jpg"
import StoryboarScreenshot from "../../assets/images/Screenshots/Capture3.PNG"
import Logo from "../../assets/images/Logo/TMLogo1.png"
import { Link } from "react-router-dom"
import PreLoader from "../PreLoader/PreLoader";

// Price List
const priceList = [" Number of Projects", "Number of members per project", "Video call duration", "Storyboard service", "Chat room service", "Video room service", ""]

class Home extends Component {

state = {
        isLoading: false
  };

    async componentDidMount() {
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.setState({isLoading: false});
        },5000)
    };

  createBusinessCard(image = null, title = "", decription = "") {
      return (
          <div className="an_home_buiness_card w-100 h-100 d-flex flex-column justify-content-center p-5" >
              <div className="text-center" >
                  <img className="img-fluid" src={image} ></img>
              </div>
              <h4 className="text-center mt-4 mb-1" >{title}</h4>
              <p className="lead font-weight-normal mt-0 text-center an_home_buiness_card_desc mb-4"   >{decription}</p>
              <a href="" className="text-center" >Learn more</a>
          </div>
      )
  }

  createFeatureCard(image, title, decription) {
      return (
          <li>
              <picture>
                  <img width="100" height="100" src={image} alt="Bookings icon" />
              </picture>
              <div className="features__content">
                  <h3 className="feature-title">{title}</h3>
                  <p className="p p--secondary p--small">{decription} </p>
              </div>
          </li>
      )
  }

  createPriceCard(subtitle, title, price, projects, members, videocall) {
      return (
          <div class="pricing-plans__item plan" title={title}>
              <div class="plan__header">
                  <p class="plan__header-subtitle">{subtitle}</p>
                  <p class="plan__header-title">{title}</p>
                  <div class="plan__header-price month"><p class="plan__header-price-value">{price}</p><span class="plan__header-price-text">/month</span></div>
              </div>
              <ul class="plan__list">
                  <li class="plan__list-item">
                      <div class="plan__list-text info">
                          Number of Projects
                                              </div>
                      <div class="plan__list-value"><span class="plan__list-value--month">{projects}</span><span class="divider">/</span><span class="plan__list-value--text">month</span></div>
                  </li>
                  <li class="plan__list-item">
                      <div class="plan__list-text info">
                          Number of members per project
                                              </div>
                      <div class="plan__list-value"><span class="plan__list-value--month">{members}</span><span class="divider">/</span><span class="plan__list-value--text">month</span></div>
                  </li>
                  <li class="plan__list-item">
                      <div class="plan__list-text info">
                          Video call duration
                                              </div>
                      <div class="plan__list-value"><span class="plan__list-value--month">{videocall}</span><span class="divider">/</span><span class="plan__list-value--text">month</span></div>
                  </li>
                  <li class="plan__list-item included">
                      <div class="plan__list-text info">
                          Storyboard service
                                              </div>
                      <div class="plan__list-value"><i class="fal fa-check check-icon"></i></div>
                  </li>
                  <li class="plan__list-item included">
                      <div class="plan__list-text info">
                          Chat room service
                                              </div>
                      <div class="plan__list-value"><i class="fal fa-check check-icon"></i></div>
                  </li>
                  <li class="plan__list-item included">
                      <div class="plan__list-text info">
                          Video room service
                                              </div>
                      <div class="plan__list-value"><i class="fal fa-check check-icon"></i></div>
                  </li>
              </ul>
              <Button className="mx-2 my-2" style={{ backgroundColor: '#47c2f387', border: "none", color: "#000000ba" }} ><a href={`https:///signup`} style={{ textDecoration: "none", color: "#fff" }}>Subscribe</a></Button>
          </div>
      )
  }

  render() {
    if (this.state.isLoading)
        return <PreLoader/>

    return (
      <main className="an_home" >
        <Container className="pt-4 pt-sm-5 pb-5 an_home_section_1" >

            <div className="shadow-box" ></div>    
            <Row >
                <Col md={12} lg={6} className="pt-0 pt-lg-1">
                    <h1><img className="" width="50%" src={Logo} /></h1>
                    <h1 className="" >One task management platform</h1>
                    <h1 className="display-5 font-weight-normal" >for<span className="an-text-info" > all your project planning needs</span></h1>
                    <p className="lead font-weight-normal text-muted mb-4" >Simply define your services and providers, display their availability, and you will have clients both old and new making bookings 24/7.</p>
                    
                    {!this.props.currentUser && (
                            <h1>
                                <Button color="primary" className="rounded-pill px-5 py-3 m-3" size="lg" ><Link style={{ textDecoration: "none", color: "#fff" }}  to="/register" >Get an Account</Link></Button>
                                <Button color="primary" className="rounded-pill px-5 py-3 m-3" size="lg" ><Link style={{ textDecoration: "none", color: "#fff" }}  to="/login" >Log in</Link></Button>
                            </h1>
                        )
                    }
                    {this.props.currentUser && (
                            <h1>
                                <Button color="primary" className="rounded-pill px-5 py-3 m-3" size="lg" ><Link style={{ textDecoration: "none", color: "#fff" }}  to="/newproject" >Get Started</Link></Button>
                            </h1>
                        )
                    }
                </Col>
                <Col md={12} lg={6} className="pt-5 pt-lg-0 text-center pr-3 pr-md-0 an_home_section_1_mask" >
                    <UncontrolledCarousel controls={false} indicators={false} autoPlay={true} items={[
                        {
                            src: Images.carousel_1,
                            altText: '',
                            caption: '',
                            header: '',
                            key: ' carousel_1'
                        },
                        {
                            src: Images.carousel_2,
                            altText: '',
                            caption: '',
                            header: '',
                            key: ' carousel_2'
                        },
                        {
                            src: Images.carousel_3,
                            altText: '',
                            caption: '',
                            header: '',
                            key: ' carousel_3'
                        },
                        {
                            src: Images.carousel_4,
                            altText: '',
                            caption: '',
                            header: '',
                            key: ' carousel_4'
                        }, {
                            src: Images.carousel_5,
                            altText: '',
                            caption: '',
                            header: '',
                            key: ' carousel_5'
                        }, {
                            src: Images.carousel_6,
                            altText: '',
                            caption: '',
                            header: '',
                            key: ' carousel_6'
                        }
                    ]} />
                </Col>
            </Row>
        </Container>

        {/* Business cards */}
        <Container className="pt-5 pb-5">
            <Row className="justify-content-center" >
                <Col md={5} ><h3 className="text-uppercase text-center" >managing <span className="an-text-info" >made simple </span>for your business</h3></Col>
            </Row>
            <Row className="mt-3 justify-content-center" >
                <Col xs={12} sm={12} md={6} lg={4} className="pb-5" >{this.createBusinessCard(Images.Project_Management, "Project planning", "Create one project and add your team members into it under different access control tiers and manage all your team needs in one go.")}</Col>
                <Col xs={12} sm={12} md={6} lg={4} className="pb-5" >{this.createBusinessCard(Images.scrumboard, "Managing storyboards", "Your team can manage story boards inside each and every project separately.")}</Col>
                <Col xs={12} sm={12} md={6} lg={4} className="pb-5" >{this.createBusinessCard(Images.videocall, "Team communication", "Once you create a project, a separate chat room and a separate video conferencing room will be created automatically which will be 24/7 live")}</Col>
            </Row>
        </Container>

        {/* glimpse */}
        <Container className="pt-5 pb-5 an_home_covid_section"  >
            <Row className="justify-content-start" >
                <Col md={12} ><h3 className="text-uppercase text-left an_home_covid_top_head" >  JOIN TEAM MASTER AND ENJOY THESE AMAZING SERVICES</h3><h4>IN ONE SINGLE PLATFORM </h4></Col>
            </Row>
            
            <Row className="mt-3 " >
                <Col sm={12} md={7} lg={8} >
                    <h5 style={{"text-align": "left"}}>Storyboards</h5>
                    <div className="d-flex align-items-center mt-5" >
                        <img className="hand_img shadow" width={120} src={StoryboarScreenshot} />
                        {/* <img width={100} className="qr_img" src={StoryboarScreenshot} /> */}
                        {/* <p className="qr_text font-weight-bold" >
                            Simple,<br />
                            Scan the code<br />
                            & Let customers<br />
                            send their details<br />
                        </p> */}
                    </div>
                </Col>
                <Col sm={12} md={5} lg={4} >
                    <p style={{ lineHeight: "50px" }} className="h1 mb-0 text-left an_home_covid_right_header mb-3" >
                        IT<br />
                    SAVES <span className="an-text-info" >TIME</span><br />
                    SAVES <span className="an-text-info" >MONEY</span><br />
                    &
                    COMPLETELTLY <span className="an-text-info" >ALL IN ONE</span><br />
                        <span className="an-text-info" >FOR YOU </span>
                    </p>
                </Col>
            </Row>
            <h5 style={{"text-align": "left"}}>Chat Rooms / Video Rooms</h5>
            <Row className="mt-3" >
                <Col sm={12} md={6} lg={6} >
                    <img className="hand_img shadow-lg" width={100} src={ChatRoomScreenshot} />
                </Col>
                <Col sm={12} md={6} lg={6} >
                    <img className="hand_img shadow-lg" width={100} src={VideoRoomScreenshot} />
                </Col>
            </Row>
        </Container>

        {/* Feature cards */}
        <Container className="mt-5">
            <Row className="justify-content-center mb-md-5" >
                <Col md={5} ><h3 className="text-uppercase text-center" >Our <span className="an-text-info" >Features</span></h3></Col>
            </Row>
            <Row className="mt-3 justify-content-center" >
                <Col xs={12}>
                    <ul className="features__list features--list-main">
                        {this.createFeatureCard(Images.feature_1, "Project planning", "Manage your day to day activities")}
                        {this.createFeatureCard(Images.feature_2, "Chat with your team", "A separate group chat room / chat channel will be created for you once you created your project with your friends")}
                        {this.createFeatureCard(Images.feature_3, "You are safe with TeamMaster", "We do not disclose your personal data chats or video calls and they are end to end encrypted with Jitsi Video Engine and Chatengine.io")}
                        {this.createFeatureCard(Images.feature_4, "Live Messaging / Conferencing", "Chat rooms and video rooms are 24/7 live. Join the team call / chat at any time")}
                        {this.createFeatureCard(Images.feature_5, "Integrate to your GitHub/BitBucket version controller", "This feature is under construction")}
                        {this.createFeatureCard(Images.feature_6, "Multi channel", "Manage multiple projects as an admin, as a moderator or as a member.")}
                    </ul>
                </Col>
            </Row>
        </Container>

        {/* Price card */}
        <Container className="py-5">
            <Row className="justify-content-center mb-md-5" >
                <Col md={5} ><h3 className="text-uppercase text-center" >Our <span className="an-text-info" >Pricing</span></h3></Col>
            </Row>
            <Row className="mt-3 justify-content-center" >
                <Col xs={12}>
                    <div class="pricing-plans__list">
                        <div class="pricing-plans__item info">
                            <ul class="plan__list">
                                {priceList.map(item => {
                                    return (
                                        <li class="plan__list-item info has-tooltip">{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {this.createPriceCard("", "Free", "$00.00", "2", "10", "Unlimited")}
                        {this.createPriceCard("", "Standard", "$29.90", "20", "50", "Unlimited")}
                        {this.createPriceCard("", "Premium", "$59.90", "Unlimited", "Unlimited", "Unlimited")}
                    </div>
                </Col>
            </Row>
        </Container>

        {/* Footer */}
        <Container>
            <Row>
                <Col xs={12} >
                    <footer class="pt-4 my-md-5 pt-md-5 border-top">
                        <div class="row">
                            <div class="col-12 col-md-2">
                                <img class="mb-2" src='' alt="" height="24" />
                                <small class="d-block mb-3 text-muted">© 2020</small>
                            </div>
                            <div class="col-12 col-md-5">
                                <h5>Team Master</h5>
                                <p>
                                    We are a group of experienced, young and energetic individuals who believe in making the Sri Lankan IT and mobile app space, an exciting and innovative place to be. We combine years of experience, both nationally and internationally, with the best of the brains in the country to develop disruptive products both locally and internationally.
                                </p>
                            </div>
                            <div class="col-12 col-md-5">
                                <h5>CONTACT US</h5>
                                <ul class="list-unstyled text-small">
                                    <li><a class="text-muted" href="#">University of Kelaniya, Dalugama, Sri Lanka</a></li>
                                    <li><a class="text-muted" href="mailto:info@hatchyard.io">teammasterlk@gmail.com</a></li>
                                    <li><a class="text-muted" href="tel:+94 0777 071 934"> +94 76 841 6637</a></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </Col>
            </Row>
        </Container>
      </main>
    );
  }
}

export default Home;
