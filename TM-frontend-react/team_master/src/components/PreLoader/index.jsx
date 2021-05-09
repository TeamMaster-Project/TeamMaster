import React, { Component } from "react";
import Loader from "../../assets/PreLoader/loader1.gif"
import "./index.css";

class PreLoader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="preloader-container">
          <img src={Loader} width="100px" height="100px" />
        </div>
      </React.Fragment>
    );
  }
}

export default PreLoader;
