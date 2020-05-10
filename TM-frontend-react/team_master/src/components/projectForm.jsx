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
      member_userEmail: [],
    },
    chipsModerators: [],
    chipsMembers: [],
    chipsPlaceholders: [],

    currentUser: "",
    errors: {},
  };

  schema = {
    //Joi validate schema
    _id: Joi.string(),
    name: Joi.string().min(5).max(50).required().label("Name"),
    description: Joi.string().min(0).max(255).required().label("Description"),
    moderater_userEmail: Joi.array().required().label("ModeratorEmails"),
    member_userEmail: Joi.array().required().label("MemberEmails"),
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
      this.setState({ currentUser: currentUser.email }); //To append at the end to chips
      // var currentUserArr = [currentUser.email];
      // datacopy.moderater_userEmail = currentUserArr;

      const projectId = this.props.match.params.id;
      if (projectId === "new") {
        return;
      }

      const { data: project } = await getProject(projectId);
      this.setState({ data: this.mapToViewModel(project) });

      const datacopy = this.state.data;
      this.setState({
        chipsModerators: datacopy.moderater_userEmail,
        chipsMembers: datacopy.member_userEmail,
      });
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
      //moderater_userEmail: [project.moderators[0].email],
      moderater_userEmail: project.moderators.map((m) => m.email), //moderator emails from all the emails array properties in project
      member_userEmail: project.members.map((m) => m.email),
    };
  }

  onChangeChipsModerators = (chips) => {
    this.setState({ chipsModerators: chips });
  };
  onChangeChipsMembers = (chips) => {
    this.setState({ chipsMembers: chips });
  };

  doSubmit = async () => {
    await this.setState((prevState) => ({
      chipsModerators: [...prevState.chipsModerators, this.state.currentUser],
    }));
    var finalDataCopy = this.state.data;
    const chipsModeratorsCopy = this.state.chipsModerators;
    const chipsMembersCopy = this.state.chipsMembers;
    finalDataCopy.moderater_userEmail = chipsModeratorsCopy;
    finalDataCopy.member_userEmail = chipsMembersCopy;
    this.setState({ data: finalDataCopy });

    await saveProject(this.state.data);
    this.props.history.push("/myprojects");
  };

  render() {
    console.log(this.state.chipsPlaceholders);
    //console.log(this.state.chipsModerators);
    console.log(this.state.data);
    console.log("current user", this.state.currentUser);

    return (
      <div className="">
        <h1>Save Project</h1>

        <div>
          <form onSubmit={this.handleSubmit}>
            {/* name, label, datatype */}
            {this.renderInputs("name", "Name", "text")}
            {/* {this.renderSelect("memberId", "Member", this.state.members)} */}
            {this.renderInputs("description", "Description", "text")}
            <div>
              <label htmlFor="">Moderator Emails</label>
              <Chips
                value={this.state.chipsModerators}
                onChange={this.onChangeChipsModerators}
                suggestions={this.state.chipsPlaceholders}
                placeholder="Search EMAILS of your friends to add as moderators for your project.(All the members need to have a TeamMaster account)"
              />
            </div>

            <div>
              <label htmlFor="">Member Emails</label>
              <Chips
                value={this.state.chipsMembers}
                onChange={this.onChangeChipsMembers}
                suggestions={this.state.chipsPlaceholders}
                placeholder="Search EMAILS of your friends to add as members for your project.(All the members need to have a TeamMaster account)"
              />
            </div>
            <br />
            {this.renderButton("Save")}
          </form>

          <div>
            <p> About moderators and members. Better add a card view</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectForm;
