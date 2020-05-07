import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProjectSummary extends Component {
  render() {
    const { name, description } = this.props;
    return (
      <div className="card text-center my-3 mx-5 projectsummery">
        <div className="card-header">
          <h3>
            {name}{" "}
            <span>
              <Link to="#" className="btn btn-sm btn-light ">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                {/* edit icon */}
              </Link>
            </span>
          </h3>
        </div>
        <div className="card-body">
          <p className="card-text">{description}</p>
        </div>
      </div>
    );
  }
}

export default ProjectSummary;
