import React from "react";
//import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import MyProjects from "./components/myprojects";
import Project from "./components/project";
import NotFound from "./components/notFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Switch>
          <Route exact path="/myprojects" component={MyProjects} />
          <Route path="/myprojects/:id" component={Project} />
          <Redirect exact from="/" to="/myprojects" />
          <Route path="/notFound" component={NotFound} />

          <Redirect to="notFound" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
