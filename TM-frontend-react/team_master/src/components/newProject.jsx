import React from "react";
import { Link } from "react-router-dom";
const NewForm = () => {
  return (
    <div className="newproject">
      <h3>Create Your New Project And Manage It Easily With TEAM MASTER</h3>
      <h1>
        <Link
          to="/myprojects/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Project
        </Link>
      </h1>
    </div>
  );
};

export default NewForm;
