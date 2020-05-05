import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getProject, saveProject } from "../services/fake1ProjectService";
class ProjectForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
    },
    //members:[],
    errors: {},
  };
  schema = {
    //Joi validate schema
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
  };

  componentDidMount() {
    //call GetMethods

    // const members = getUsers();
    // this.setState({ members });

    const projectId = this.props.match.params.id;
    if (projectId === "new") return;

    const project = getProject(projectId);
    if (!project) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(project) });
  }

  mapToViewModel(project) {
    return {
      _id: project._id,
      name: project.name,
      //members: project.member._id,
      description: project.description,
    };
  }

  doSubmit = () => {
    saveProject(this.state.data);
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
