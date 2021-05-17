import React, { Component } from "react";
import auth from "../../services/authService";
import Form from "../Common/form";
import Joi from "joi-browser";
import { getProject, saveProject } from "../../services/projectService";
import { addChatRoom, getChatRooms, addChatMembers, deleteChatMembers } from "../../services/chatboxService";
import { getUsers } from "../../services/userService";
import Chips, { Chip } from "react-chips";
import "./index.css";
import { toast } from "react-toastify";
import PreLoader from "../PreLoader/PreLoader";
import { Link } from "react-router-dom";

class ProjectForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      moderater_userEmail: [],
      member_userEmail: [],
      createrEmail: "",
    },
    chipsModerators: [],
    chipsMembers: [],
    chipsPlaceholders: [],

    ExistingChatRoomMembers:[],
    NewChatRoomMembers:[],

    currentUser: "",
    errors: {},
    chatRoomId: "",

    isLoading: false,
  };

  schema = {
    //Joi validate schema
    _id: Joi.string(),
    name: Joi.string().min(5).max(50).required().label("Name"),
    description: Joi.string().min(0).max(255).required().label("Description"),
    moderater_userEmail: Joi.array().required().label("ModeratorEmails"),
    member_userEmail: Joi.array().required().label("MemberEmails"),
    createrEmail: Joi.string().label("creater"),
  };

  async componentDidMount() {
    //call GetMethods
    try {
      this.setState({isLoading: true});
    
      const currentUser = await auth.getCurrentUser();
      this.setState({ currentUser: currentUser.email }); //To the purpose of appending at the end to chips

      const { data: users } = await getUsers();
      var userEmails = await users.map((m) => m.email);
      const currentUserCopy = this.state.currentUser;
      for (var i = 0; i < userEmails.length; i++) {
        //removing current logged in user from chipsPlaceholder
        if (userEmails[i] === currentUserCopy) {
          userEmails.splice(i, 1);
          i--;
        }
      }
      this.setState({ chipsPlaceholders: userEmails });

      const projectId = this.props.match.params.id;
      if (projectId === "new") {
        const dcopy = this.state.data;
        dcopy.createrEmail = currentUser.email;
        this.setState({isLoading: false})
        return;
      }

      const { data: project } = await getProject(projectId);
      this.setState({ data: this.mapToViewModel(project) });

      const datacopy = this.state.data;
      this.setState({
        chipsModerators: datacopy.moderater_userEmail,
        chipsMembers: datacopy.member_userEmail,
        ExistingChatRoomMembers: datacopy.moderater_userEmail.concat(datacopy.member_userEmail)
      });
      this.setState({isLoading: false})
    } catch (ex) {
      this.setState({isLoading: false})
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(project) {
    return {
      _id: project._id,
      name: project.name,
      description: project.description,
      createrEmail: project.creater,
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
    toast("Please Wait")
    this.setState({isLoading: true})
    try{
      await this.setState((prevState) => ({
        chipsModerators: [...prevState.chipsModerators, this.state.currentUser],
        NewChatRoomMembers: [...prevState.NewChatRoomMembers, this.state.currentUser],
      }));
      
      let updatedProject = this.state.data;
      const chipsModeratorsCopy = this.state.chipsModerators;
      const chipsMembersCopy = this.state.chipsMembers;
      updatedProject.moderater_userEmail = chipsModeratorsCopy;
      updatedProject.member_userEmail = chipsMembersCopy;
      this.setState({ data: updatedProject });
      this.setState({ NewChatRoomMembers: updatedProject.moderater_userEmail.concat(updatedProject.member_userEmail) });
  
      let res = await saveProject(this.state.data);
      toast("Project Successfully Updated");

      await this.addChatbox(res.data);
      toast("ChatRoom Successfully Updated");
      this.setState({isLoading: true})
      this.props.history.push("/myprojects");
    }catch(error){
      console.log(error);
      toast("Project Updating Failed")
    }
  };

  addChatbox = async (project) => {
      const projectId = this.props.match.params.id;
      const currentUser = await auth.getCurrentUser();

      if(projectId == "new"){
          let NewChatRoom = await addChatRoom(project.name, currentUser);
          await this.setState({chatRoomId: NewChatRoom.id})
          await this.addChatboxMembers(project, currentUser);
      }
      else{
          const { data:currentProject } = await getProject(projectId);
          let ChatRooms = await getChatRooms(currentUser);
          ChatRooms.map( async (chatroom) =>{ 
              if(chatroom.title == currentProject.name){
                  this.setState({chatRoomId: chatroom.id})
                  await this.addChatboxMembers(currentProject, currentUser);
                  await this.deleteChatboxMembers(currentUser);
                }
          });
        }
  }

  addChatboxMembers = async (currentProject, currentUser) => {
    try{
        currentProject.moderators.map( async (member) =>{ 
          await addChatMembers(this.state.chatRoomId, currentUser, member)
        });
        currentProject.members.map( async (member) =>{ 
          await addChatMembers(this.state.chatRoomId, currentUser, member)
        });
      }catch(error){
        console.log(error)
      }
  }

  deleteChatboxMembers = async (currentUser) => {
    let DroppedMembers = [...this.state.ExistingChatRoomMembers];
    //Filtering Dropped Members

    for(let i=0; i < this.state.ExistingChatRoomMembers.length; i++){
      for(let j=0; j <this.state.NewChatRoomMembers.length; j++){
        if(this.state.ExistingChatRoomMembers[i] == this.state.NewChatRoomMembers[j]) {
            DroppedMembers = DroppedMembers.filter(e => e != this.state.NewChatRoomMembers[j]);
        }
      }
    }

    DroppedMembers.map( async (member) =>{ 
          await deleteChatMembers(this.state.chatRoomId, currentUser, member)
    });

  }

  render() {
    if(this.state.isLoading)
      return <PreLoader/>

    return (
      <div className="newproject-container">
        <div className="shadow-box" ></div>
        <div className="register-form-card shadow">
          <div className="register-form shadow">
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
                {(this.props.match.params.id == "new") && (
                  <React.Fragment>
                    <Link
                      to={{
                        pathname: `/newproject/`,
                      }}
                      className="btn btn-md btn-outline-primary m-2 shadow"
                      style={{ marginBottom: 20 }}
                    >
                    Cancel
                    </Link>
                  </React.Fragment>
                )}
              </form>

              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectForm;
