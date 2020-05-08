import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../App.css";

const NavBar = (props) => {
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
          <NavLink className="nav-link" to="/newproject">
            New Project
          </NavLink>
          <NavLink className="nav-link" to="/myprojects">
            My Projects
          </NavLink>
          <NavLink className="nav-link" to="/chatbox">
            Chat Box
          </NavLink>
          <NavLink className="nav-link" to="/chatbox">
            Conference Room
          </NavLink>
          <NavLink className="nav-link" to="/contact">
            Contact Us
          </NavLink>
        </ReactBootstrap.Nav>
        <ReactBootstrap.Nav>
          {props.currentUser && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Hi {props.currentUser.name} !
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Log out
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {!props.currentUser && (
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Log In
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
        </ReactBootstrap.Nav>
      </ReactBootstrap.Navbar.Collapse>
    </ReactBootstrap.Navbar>
  );
};

export default NavBar;
