import React from "react";
import { Link } from "react-router-dom";
import "../styles/newproject.css";
const NewForm = () => {
  return (
    <div className="newproject newproject-container">
      <h3>Create Your New Project And Manage It Easily With TEAM MASTER</h3>
      {/* <img src="/images/bg1.jpg" /> */}
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
