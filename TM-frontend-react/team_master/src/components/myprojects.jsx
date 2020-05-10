import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { getProjects, deleteProject } from "../services/projectService";
import { toast } from "react-toastify";

class MyProjects extends Component {
  state = {
    projects: [],
    currentUser: "",
  };

  async componentDidMount() {
    const { data: projects } = await getProjects();
    const currentUser = auth.getCurrentUser();

    var filteredProjects = [];
    await projects.map((project) => {
      project.moderators.map((moderator) => {
        if (moderator.email == currentUser.email) {
          filteredProjects.push(project);
        }
      });
      project.members.map((member) => {
        if (member.email == currentUser.email) {
          filteredProjects.push(project);
        }
      });
    });

    this.setState({
      projects: filteredProjects,
      currentUser: currentUser,
    });
  }

  handleDelete = async (project) => {
    //console.log(project);//Delete Projects
    const originalProjects = this.state.projects;
    const projects = originalProjects.filter((m) => m._id !== project._id);
    this.setState({ projects: projects }); //projects object array override by projects

    try {
      await deleteProject(project._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This Project Is Already Deleted");

      this.setState({ projects: originalProjects });
    }
  };
  render() {
    console.log(this.state.projects);
    console.log(this.state.currentUser);

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
                    <Link
                      to={{
                        pathname: `/myprojects/${project._id}/${project.name}`,
                        projectName: `${project.name}`,
                        description: `${project.description}`,
                      }}
                    >
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
