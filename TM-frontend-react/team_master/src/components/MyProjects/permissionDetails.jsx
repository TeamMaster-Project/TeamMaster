import React, { Component } from "react";
class PermissionDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="card text-white bg-danger mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Admins</div>
          <div className="card-body">
            <p className="card-text">
              Only the Creater/Admin has permission to DELETE project
            </p>
          </div>
        </div>
        <div
          className="card text-white bg-info mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Moderators</div>
          <div className="card-body">
            <p className="card-text">
              Only the moderators has permission to EDIT project details and
              MANAGE BASKETS.
            </p>
          </div>
        </div>
        <div
          className="card text-white bg-success mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Members</div>
          <div className="card-body">
            <p className="card-text">
              Members who are not tagged as moderators can EDIT TASK status only
              and move it to another basket after completing.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PermissionDetails;
