import React, { Component } from "react";
import auth from "../services/authService";
import Form from "./common/form";
import Joi from "joi-browser";
import { getProject, saveProject } from "../services/projectService";
class ProjectForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      moderater_userEmails: "",
    },

    //members:[],
    errors: {},
  };

  schema = {
    //Joi validate schema
    _id: Joi.string(),
    name: Joi.string().min(5).max(50).required().label("Name"),
    description: Joi.string().min(0).max(255).required().label("Description"),
    moderater_userEmails: Joi.array().required().label("ModeratorId"),
  };

  async componentDidMount() {
    //call GetMethods

    // const members = getUsers();
    // this.setState({ members });
    try {
      const currentUser = auth.getCurrentUser();

      var datacopy = this.state.data;
      var currentUserArr = [currentUser.email];
      datacopy.moderater_userEmails = currentUserArr;

      const projectId = this.props.match.params.id;
      if (projectId === "new") {
        this.setState({ data: datacopy });
        return;
      }

      const { data: project } = await getProject(projectId);

      this.setState({ data: this.mapToViewModel(project) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(project) {
    return {
      _id: project._id,
      name: project.name,
      description: project.description,
      moderater_userEmails: [project.moderators[0].email], //need to read all the moderators IDs from all the array objects :/
    };
  }

  doSubmit = async () => {
    await saveProject(this.state.data);
    this.props.history.push("/myprojects");
  };

  render() {
    console.log(this.state.data);

    return (
      <div className="">
        <h1>Add New Project</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* name, label, datatype */}
            {this.renderInputs("name", "Name", "text")}
            {/* {this.renderSelect("memberId", "Member", this.state.members)} */}
            {this.renderInputs("description", "Description", "text")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectForm;
