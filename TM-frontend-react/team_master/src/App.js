import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navBar";
// import MyProjects from "./components/myprojectswithfake";
import MyProjects from "./components/myprojects";
import Project from "./components/project";
import NotFound from "./components/notFound";
import ProjectForm from "./components/projectForm";
import NewProject from "./components/newProject";
import Register from "./components/registerForm";
import LoginForm from "./components/loginForm";
import BasketForm from "./components/basketForm";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <header className="">
        <Switch>
          <Route path="/notFound" component={NotFound} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/newproject" component={NewProject} />
          <Route exact path="/myprojects" component={MyProjects} />
          <Route exact path="/myprojects/:id/:name" component={Project} />

          <Route
            exact
            path="/myprojects/:id/:name/:basketid"
            component={BasketForm}
          />
          <Route path="/myprojects/:id" component={ProjectForm} />
          <Redirect exact from="/" to="/myprojects" />
          <Redirect to="notFound" />
        </Switch>
      </header>
    </React.Fragment>
  );
}

export default App;
