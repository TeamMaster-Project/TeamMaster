import React, { Component } from "react";
import LoaderGif from "../../assets/PreLoader/loader1.gif"
import "./index.css";

class PreLoader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="an_home_section_1">
        <div className="shadow-box" ></div>
          <img src={LoaderGif} width="100px" height="100px" />
        </div>
      </React.Fragment>
    );
  }
}

export default PreLoader;
