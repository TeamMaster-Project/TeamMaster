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
              The permission to delete created projet is only for the creater of
              the project.
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
              Creator can add moderators who have access to edit the project
              details, and set baskets, delete baskets and manage the project
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
              Members who are not tagged as moderators can edit task status and
              move it to another the basket after completing.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PermissionDetails;
