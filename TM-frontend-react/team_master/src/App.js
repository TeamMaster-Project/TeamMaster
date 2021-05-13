import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import MyProjects from "./components/MyProjects";
import Project from "./components/MyProjects/project_page";
import NotFound from "./components/PageNotFound";
import ProjectForm from "./components/NewProject/projectForm";
import NewProject from "./components/NewProject";
import Register from "./components/auth/Register";
import LoginForm from "./components/auth/Login";
import ProtectedRoute from "./components/Common/protectedRoute";
import Logout from "./components/auth/logout";
import BasketForm from "./components/MyProjects/project_page/basketForm";
import TaskForm from "./components/MyProjects/project_page/taskForm";
import auth from "./services/authService";
import Chatbox from "./components/Chatbox/index";
import ContactUs from "./components/ContactUs/index";

// import logo from "./logo.svg";
import "./App.css";
import JitsiComponent from "./components/VideoConferenceRoom/VideoConference";
import VideoConferenceArea from "./components/VideoConferenceRoom";
import CallEndsThankYou from "./components/VideoConferenceRoom/CallEndsRedirect";

class App extends Component {
  state = {
    currentUser: {},
  };
  componentDidMount() {
    const currentUser = auth.getCurrentUser();
    this.setState({ currentUser: currentUser });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar currentUser={this.state.currentUser} />
        <main className="">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/notFound" component={NotFound} />
            <Route path="/home" component={Home} />
            <Route path="/contact" component={ContactUs} />
            <ProtectedRoute exact path="/newproject" component={NewProject} />
            <ProtectedRoute exact path="/myprojects" component={MyProjects} />
            <ProtectedRoute exact path="/chatroom" component={Chatbox} />
            <ProtectedRoute
              exact
              path="/videoroom"
              component={VideoConferenceArea}
            />
            <ProtectedRoute
              exact
              path="/videoroom/:projectId/:projectName"
              component={JitsiComponent}
            />
            <ProtectedRoute
              exact
              path="/thank-you"
              component={CallEndsThankYou}
            />

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
            <ProtectedRoute
              path="/myprojects/:id"
              render={(props) => (
                <ProjectForm {...props} currentUser={this.state.currentUser} />
              )}
            />

            <Redirect exact from="/" to="/home" />
            {/* <Redirect to="notFound" /> */}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
