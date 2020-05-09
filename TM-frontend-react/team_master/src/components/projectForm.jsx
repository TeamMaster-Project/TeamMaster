import React, { Component } from "react";
import auth from "../services/authService";
import Form from "./common/form";
import Joi from "joi-browser";
import { getProject, saveProject } from "../services/projectService";
import { getUsers } from "../services/userService";
import Chips, { Chip } from "react-chips";
class ProjectForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      moderater_userEmail: [],
    },
    chips: [],
    chipsPlaceholders: [],

    currentUser: "",
    errors: {},
  };

  schema = {
    //Joi validate schema
    _id: Joi.string(),
    name: Joi.string().min(5).max(50).required().label("Name"),
    description: Joi.string().min(0).max(255).required().label("Description"),
    moderater_userEmail: Joi.array().required().label("ModeratorId"),
  };

  async populateUsers() {
    try {
      const { data: users } = await getUsers();
      const userEmails = await users.map((m) => m.email);
      this.setState({ chipsPlaceholders: userEmails });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    //call GetMethods
    await this.populateUsers();

    try {
      const currentUser = auth.getCurrentUser();

      var datacopy = this.state.data;
      datacopy.moderater_userEmail = [currentUser.email];

      this.setState({ currentUser: currentUser.email }); //To append at the end to chips
      // var currentUserArr = [currentUser.email];
      // datacopy.moderater_userEmail = currentUserArr;

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
      description: project.description, //moderators[0].email
      //moderater_userEmail: [project.moderators[0].email],
      moderater_userEmail: project.moderators.map((m) => m.email), //moderator emails from all the emails array properties in project
    };
  }

  doSubmit = async () => {
    this.setState((prevState) => ({
      chips: [...prevState.chips, this.state.currentUser],
    }));
    //const chipsCopy = this.state.chips;
    //this.setState({ data: { moderater_userEmail: chipsCopy } });
    await saveProject(this.state.data);
    this.props.history.push("/myprojects");
  };

  onChange = (chips) => {
    this.setState({ chips: chips });
  };

  render() {
    console.log(this.state.chipsPlaceholders);
    console.log(this.state.chips);
    console.log(this.state.data);
    console.log(this.state.currentUser);

    return (
      <div className="">
        <h1>Add New Project</h1>

        <div>
          <form onSubmit={this.handleSubmit}>
            {/* name, label, datatype */}
            {this.renderInputs("name", "Name", "text")}
            {/* {this.renderSelect("memberId", "Member", this.state.members)} */}
            {this.renderInputs("description", "Description", "text")}
            <div>
              <Chips
                value={this.state.chips}
                onChange={this.onChange}
                suggestions={this.state.chipsPlaceholders}
                placeholder="Search EMAILS of your friends to add as moderators for your project.(All the members need to have a TeamMaster account)"
              />
            </div>
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectForm;
