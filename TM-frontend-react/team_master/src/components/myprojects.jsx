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
  render() {
    if (this.state.projects.length === 0)
      return <p>There are no Projects yet</p>;
    return (
      <div>
        <h1>My Projects</h1>
        <div className="row">
          <table className="table container">
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
                    <button
                      //   onClick={() => this.handleEdit(project)}
                      className="btn btn-success btn-sm"
                    >
                      Edit Project
                    </button>
                  </td>
                  <td>
                    <button
                      //   onClick={() => this.handleDelete(project)}
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
