import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectSummary extends Component {
  render() {
    const { name, description, projectId, isaModerator } = this.props;
    return (
      <div className="card text-center my-3 mx-5 projectsummery">
        <div className="card-header">
          <h3>
            {name} &nbsp;
            {isaModerator && (
              <span>
                <Link
                  to={{
                    pathname: `/myprojects/${projectId}`,
                  }}
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  {/* edit icon */}
                </Link>
              </span>
            )}
          </h3>
        </div>
        <div className="card-body">
          {/* <p className="card-text">{description}</p> */}
          <p className="card-text">
            <i>
              {" "}
              You will never miss any important schedules with TeamMaster...
            </i>
          </p>
        </div>
      </div>
    );
  }
}

export default ProjectSummary;
