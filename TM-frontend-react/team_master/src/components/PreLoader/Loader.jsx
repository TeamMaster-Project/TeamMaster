import React, { Component } from "react";
import LoaderGif from "../../assets/PreLoader/loader1.gif"
import "./index.css";

class Loader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
            <h2>
              <img src={LoaderGif} width="100px" height="100px" />
            </h2>
          </div>
      </React.Fragment>
    );
  }
}

export default Loader;


