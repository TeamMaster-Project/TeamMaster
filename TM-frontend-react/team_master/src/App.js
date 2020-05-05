import React from "react";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import MyProjects from "./components/myprojects";
import Project from "./components/project";
import NotFound from "./components/notFound";
import ProjectForm from "./components/projectForm";
import NewProject from "./components/newProject";
import Register from "./components/registerForm";
import LoginForm from "./components/loginForm";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <header className="container">
        <Switch>
          <Route path="/notFound" component={NotFound} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/newproject" component={NewProject} />
          <Route exact path="/myprojects" component={MyProjects} />
          <Route path="/myprojects/:id/:name" component={Project} />
          <Route path="/myprojects/:id" component={ProjectForm} />
          <Redirect exact from="/" to="/myprojects" />
          <Redirect to="notFound" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
