import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const NavBar = (props) => {
  //console.log(props.currentUser);
  return (
    <ReactBootstrap.Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="navbar"
    >
      <ReactBootstrap.Navbar.Brand href="/">
        TeamMaster
      </ReactBootstrap.Navbar.Brand>
      <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootstrap.Nav className="mr-auto">
          {/* <NavLink className="nav-link" to="/home">
            Home
          </NavLink> */}
           <Router>
              <NavLink className="nav-link" to="/newproject">
                New Project
              </NavLink>
           </Router>
           <Router>
              <NavLink className="nav-link" to="/myprojects">
                My Projects
              </NavLink>
            </Router>
            <Router>
              <NavLink className="nav-link" to="/chatroom">
                My Chat Rooms
              </NavLink>
            </Router>
            <Router>
              <NavLink className="nav-link" to="/videoroom">
                My Conference Rooms
              </NavLink>
            </Router>
            <Router>
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </Router>
        </ReactBootstrap.Nav>

        <ReactBootstrap.Nav>
          {props.currentUser && (
            <React.Fragment>
              <li className="nav-item">
              <Router>
                <NavLink className="nav-link" to="#">
                  Hi {props.currentUser.name} !
                </NavLink>
              </Router>
              </li>
              <li className="nav-item">
              <Router>
                <NavLink className="nav-link" to="/logout">
                  Log out
                </NavLink>
              </Router>
              </li>
            </React.Fragment>
          )}
          {!props.currentUser && (
            <React.Fragment>
              <Router>
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              </Router>
              <Router>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </Router>
            </React.Fragment>
          )}        
        </ReactBootstrap.Nav>
      </ReactBootstrap.Navbar.Collapse>
    </ReactBootstrap.Navbar>
  );
};

export default NavBar;
