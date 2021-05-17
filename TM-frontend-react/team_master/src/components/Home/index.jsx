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
import { Link } from "react-router-dom"
import PreLoader from "../PreLoader/PreLoader";

// Price List
const priceList = ["Included bookings", "Included SMS", "Included emails", "Customer info", "Covid customer form", ""]

class Home extends Component {

state = {
        isLoading: false
  };

    async componentDidMount() {
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.setState({isLoading: false});
        },7000)
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

  createPriceCard(subtitle, title, price, booking, sms, emails) {
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
                          Included bookings
                                              </div>
                      <div class="plan__list-value"><span class="plan__list-value--month">{booking}</span><span class="divider">/</span><span class="plan__list-value--text">month</span></div>
                  </li>
                  <li class="plan__list-item">
                      <div class="plan__list-text info">
                          Included SMS
                                              </div>
                      <div class="plan__list-value"><span class="plan__list-value--month">{sms}</span><span class="divider">/</span><span class="plan__list-value--text">month</span></div>
                  </li>
                  <li class="plan__list-item">
                      <div class="plan__list-text info">
                          Included emails
                                              </div>
                      <div class="plan__list-value"><span class="plan__list-value--month">{emails}</span><span class="divider">/</span><span class="plan__list-value--text">month</span></div>
                  </li>
                  <li class="plan__list-item included">
                      <div class="plan__list-text info">
                          Customer info
                                              </div>
                      <div class="plan__list-value"><i class="fal fa-check check-icon"></i></div>
                  </li>
                  <li class="plan__list-item included">
                      <div class="plan__list-text info">
                          Covid customer form
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
                <Col md={12} lg={6} className="pt-0 pt-lg-5">
                    <h1 className="" >One platform</h1>
                    <h1 className="display-5 font-weight-normal" >for<span className="an-text-info" > all your project managing </span>needs</h1>
                    <p className="lead font-weight-normal text-muted mb-4" >Simply define your services and providers, display their availability, and you will have clients both old and new making bookings 24/7.</p>
                    <h1>
                    <Button color="primary" className="rounded-pill px-5 py-3 m-3" size="lg" ><a href={`https://sss/signup`} style={{ textDecoration: "none", color: "#fff" }}>Get an Account</a></Button>
                    <Button color="primary" className="rounded-pill px-5 py-3 m-3" size="lg" ><Link style={{ textDecoration: "none", color: "#fff" }}  to="/login" >Log in</Link></Button>
                    </h1>
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
                <Col xs={12} sm={12} md={6} lg={4} className="pb-5" >{this.createBusinessCard(Images.pet_grooming, "Project planning", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}</Col>
                <Col xs={12} sm={12} md={6} lg={4} className="pb-5" >{this.createBusinessCard(Images.barber_salons, "Managing storyboards", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}</Col>
                <Col xs={12} sm={12} md={6} lg={4} className="pb-5" >{this.createBusinessCard(Images.physiotherapy, "Team communication", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}</Col>
            </Row>
        </Container>

        {/* Feature cards */}
        <Container className="">
            <Row className="justify-content-center mb-md-5" >
                <Col md={5} ><h3 className="text-uppercase text-center" >Our <span className="an-text-info" >Features</span></h3></Col>
            </Row>
            <Row className="mt-3 justify-content-center" >
                <Col xs={12}>
                <ul className="features__list features--list-main">
                    {this.createFeatureCard(Images.feature_1, "Accept online bookings", "Your own mobile-optimised booking web")}
                    {this.createFeatureCard(Images.feature_2, "Notifications via SMS/Email", "Reminders to staff and clients whenever appointments are booked, cancelled or rescheduled. With push notifications on your mobile for new booking information via the admin app.")}
                    {this.createFeatureCard(Images.feature_3, "Up to 10 staff logins, Reports, Leave calendar", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}
                    {this.createFeatureCard(Images.feature_4, "Live HAT and Messaging", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}
                    {this.createFeatureCard(Images.feature_5, "Integrate to your existing wbesite or let us build you a new site", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}
                    {this.createFeatureCard(Images.feature_6, "Multi channel", "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. ")}
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
                        {this.createPriceCard("", "Basic", "$12.90", "50", "100", "Unlimited")}
                        {this.createPriceCard("Most popular", "Standard", "$29.90", "90", "300", "Unlimited")}
                        {this.createPriceCard("", "Basic", "$59.90", "500", "500", "Unlimited")}
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
                                    <li><a class="text-muted" href="#">3rd floor, 292 High Level Rd, Nugegoda 10250, Sri Lanka</a></li>
                                    <li><a class="text-muted" href="mailto:info@hatchyard.io"> info@hatchyard.io</a></li>
                                    <li><a class="text-muted" href="tel:+94 0777 071 934"> +94 0777 071 934</a></li>
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
