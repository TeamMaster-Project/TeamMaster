import React from "react";
//import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import MyProjects from "./components/myprojects";
import NavBar from "./components/navBar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Switch>
          <Route path="/myprojects" component={MyProjects} />
          <Redirect exact from="/" to="/myprojects" />
        </Switch>
      </header>
    </div>
  );
}

export default App;
