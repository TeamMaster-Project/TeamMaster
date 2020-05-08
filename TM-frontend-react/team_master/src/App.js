import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navBar";
import Home from "./components/home";
import MyProjects from "./components/myprojects";
import Project from "./components/project";
import NotFound from "./components/notFound";
import ProjectForm from "./components/projectForm";
import NewProject from "./components/newProject";
import Register from "./components/registerForm";
import LoginForm from "./components/loginForm";
import ProtectedRoute from "./components/common/protectedRoute";
import BasketForm from "./components/basketForm";
import TaskForm from "./components/taskForm";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className="">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/home" component={Home} />
          <ProtectedRoute exact path="/newproject" component={NewProject} />
          <ProtectedRoute exact path="/myprojects" component={MyProjects} />
          <ProtectedRoute
            exact
            path="/myprojects/:id/:name"
            component={Project}
          />
          {/* <Route exact path="/myprojects/:id/:name/:description" component={Project} /> */}
          <ProtectedRoute
            exact
            path="/myprojects/:id/:name/:basketid"
            component={BasketForm}
          />
          <ProtectedRoute
            exact
            path="/myprojects/:id/:name/:basketid/:taskid"
            component={TaskForm}
          />
          <ProtectedRoute path="/myprojects/:id" component={ProjectForm} />
          <Redirect exact from="/" to="/home" />
          <Redirect to="notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
