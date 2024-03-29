import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets, deleteBasket } from "../../../services/basketService";
import { getTasks, deleteTask } from "../../../services/taskService";
import { getProject } from "../../../services/projectService";
import { toast } from "react-toastify";
// import "../../../styles/buttons/liquidbutton.css";
import EditBaskets from "./editBaskets";
import ProjectSummary from "./projectSummary";
import MainButtons from "./mainButtons";
import BasketsCardView from "./basketsCardView";
import auth from "../../../services/authService";
import "./index.css";
import Loader from "../../PreLoader/Loader";


class Project extends Component {
  state = {
    isLoading: false,

    projectId: "",
    projectName: "",
    baskets: [],
    filteredBasketIds: [],
    tasks: [],

    isaModerator: "",
  };
  async componentDidMount() {
    await this.setState({isLoading: true})
    const currentUser = await auth.getCurrentUser();
    const projectId = this.props.match.params.id;
    const { data: project } = await getProject(projectId);
    const mods = project.moderators;
    var modEmails = [];
    mods.map((m) => modEmails.push(m.email));
    var isaModerator = "";
    if (modEmails.indexOf(currentUser.email) !== -1) {
      isaModerator = true;
    } else {
      isaModerator = false;
    }

    const projectName = this.props.location.projectName;

    const { data: baskets } = await getBaskets();

    const filteredBaskets = await baskets.filter((basket) => {
      return basket.project._id == this.props.match.params.id;
    });

    var filteredBasketIds = [];
    filteredBaskets.map((filteredBasket) =>
      filteredBasketIds.push(filteredBasket._id)
    );
    const { data: tasks } = await getTasks();

    const filteredTasks = await tasks.filter((task) =>
      filteredBasketIds.includes(task.basket._id)
    );

    await this.setState({
      projectId: projectId,
      projectName: projectName,
      baskets: filteredBaskets,
      filteredBasketIds: filteredBasketIds,
      tasks: filteredTasks,
      isaModerator: isaModerator,
      isLoading: false
    });
  }

  handleDeleteBasket = async (basket) => {
    const originalBaskets = this.state.baskets;
    const baskets = originalBaskets.filter((m) => m._id !== basket._id);
    this.setState({ baskets: baskets }); //Baskets object override by baskets without the one we selected to delete

    try {
      await deleteBasket(basket._id);
       toast("Basket Successfully Deleted");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This basket is already deleted"); //Expected error handle

      this.setState({ baskets: originalBaskets });
    }
  };

  handleDeleteTask = async (task) => {
    const originalTasks = this.state.tasks;
    const tasks = originalTasks.filter((m) => m._id !== task._id);
    this.setState({ tasks: tasks }); //Tasks object override by tasks without the one we selected to delete

    try {
      await deleteTask(task._id);
      toast("Task Successfully Deleted");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This task is already deleted"); //Expected error handle

      this.setState({ tasks: originalTasks });
    }
  };

  render() {
    console.log(this.state.filteredBasketIds);
    console.log(this.state.tasks);
    console.log(this.state.isaModerator);
    //if (this.state.baskets.length === 0) return <p>There are no baskets yet</p>;
    let infoBox;
    if (this.state.baskets.length === 0)
      infoBox = <h5 style={{ color: "purple" }}>There are no baskets yet</h5>;

    return (
      <div>
        <ProjectSummary
          isaModerator={this.state.isaModerator}
          projectId={this.state.projectId}
          name={this.props.match.params.name}
          description={this.props.location.description}
        />
        {infoBox}
        <MainButtons
          isaModerator={this.state.isaModerator}
          id={this.props.match.params.id}
          name={this.props.match.params.name}
        />
        <br />
        <h6>
          {/* <i> Working Area</i> */}
        </h6>

        {this.state.isLoading && 
          <Loader/>
        }
          <div className="row" style={{ margin: "0 50px" }}>
            <div className="col">
              <BasketsCardView
                isaModerator={this.state.isaModerator}
                baskets={this.state.baskets}
                tasks={this.state.tasks}
                projectId={this.props.match.params.id}
                name={this.props.match.params.name}
                onDelete={this.handleDeleteTask}
              />
            </div>
            {this.state.isaModerator && <div class="vl"></div>}
            {this.state.isaModerator && (
              <div className="col-3 edit-baskets card shadow-lg py-5">
                <h6>Edit Baskets</h6>
                <EditBaskets //display all baskets and edit, delete them
                  baskets={this.state.baskets}
                  projectId={this.props.match.params.id}
                  name={this.props.match.params.name}
                  onDelete={this.handleDeleteBasket}
                />
              </div>
            )}
          </div>
          <br />
        </div>
    );
  }
}

export default Project;
