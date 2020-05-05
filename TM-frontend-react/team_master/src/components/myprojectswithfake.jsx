import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/fake1ProjectService";
class MyProjects extends Component {
  state = {
    projects: [],
  };
  componentDidMount() {
    this.setState({ projects: getProjects() });
  }
  handleDelete = (project) => {
    //console.log(project);
    const projects = this.state.projects.filter((m) => m._id !== project._id);
    this.setState({ projects: projects }); //projects object array override by projects
  };
  render() {
    if (this.state.projects.length === 0)
      return <p>There are no Projects yet</p>;
    return (
      <div className="container">
        <h1>My Projects</h1>
        <h1>
          <Link
            to="/myprojects/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Project
          </Link>
        </h1>
        {/* <div className="row">
          <div
            className="card text-white bg-primary mb-3 m-2 col-sm col-md-4"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Primary card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div> */}

        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                {/* <th>Moderators</th>
                <th>Members</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <Link to={`/myprojects/${project._id}/${project.name}`}>
                      {project.name}
                    </Link>
                  </td>
                  <td>{project.description}</td>
                  <td>
                    <button className="btn btn-light btn-sm">
                      <Link to={`/myprojects/${project._id}`}>
                        Edit Project
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(project)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyProjects;
