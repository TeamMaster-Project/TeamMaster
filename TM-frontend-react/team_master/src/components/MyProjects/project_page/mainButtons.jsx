import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainButtons extends Component {
  render() {
    const { id, name, isaModerator } = this.props;
    console.log(isaModerator);
    return (
      <div className="container">
      <h1>
        {isaModerator && (
         
            <button className="btn btn-primary m-3">
              <span className="gradient"></span>
              <Link
                to={{
                  pathname: `/myprojects/${id}/${name}/new`,
                }}
                style={{ color: "white" }}
              >
                New Basket
              </Link>
            </button>
          
        )}
        
          <button className="btn btn-info m-3">
            <span className="gradient"></span>
            <Link
              to={{
                pathname: `/myprojects/${id}/${name}/newtask/new`,
              }}
              style={{ color: "white" }}
            >
              New Task
            </Link>
          </button>
      </h1> 
      </div>
    );
  }
}

export default MainButtons;
