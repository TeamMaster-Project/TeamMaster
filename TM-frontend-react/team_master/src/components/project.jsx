import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets, deleteBasket } from "../services/basketService";
import { getTasks, deleteTask } from "../services/taskService";
import { toast } from "react-toastify";
import "../styles/buttons/liquidbutton.css";
import EditBaskets from "./project_page/editBaskets";
import ProjectSummary from "./project_page/projectSummary";
import MainButtons from "./project_page/mainButtons";
import BasketsCardView from "./project_page/basketsCardView";

class Project extends Component {
  state = {
    projectName: "",
    baskets: [],
    filteredBasketIds: [],
    tasks: [],
  };
  async componentDidMount() {
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

    this.setState({
      projectName: projectName,
      baskets: filteredBaskets,
      filteredBasketIds: filteredBasketIds,
      tasks: filteredTasks,
    });
  }

  handleDeleteBasket = async (basket) => {
    const originalBaskets = this.state.baskets;
    const baskets = originalBaskets.filter((m) => m._id !== basket._id);
    this.setState({ baskets: baskets }); //Baskets object override by baskets without the one we selected to delete

    try {
      await deleteBasket(basket._id);
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
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This task is already deleted"); //Expected error handle

      this.setState({ tasks: originalTasks });
    }
  };

  render() {
    console.log(this.state.baskets);
    console.log(this.state.filteredBasketIds);
    console.log(this.state.tasks);
    //if (this.state.baskets.length === 0) return <p>There are no baskets yet</p>;
    let infoBox;
    if (this.state.baskets.length === 0)
      infoBox = <h5 style={{ color: "purple" }}>There are no baskets yet</h5>;

    return (
      <div>
        <ProjectSummary
          name={this.props.match.params.name}
          description={this.props.location.description}
        />
        {infoBox}
        <MainButtons
          id={this.props.match.params.id}
          name={this.props.match.params.name}
        />
        <br /> <h6>Baskets With Tasks</h6>
        <BasketsCardView
          baskets={this.state.baskets}
          tasks={this.state.tasks}
          projectId={this.props.match.params.id}
          name={this.props.match.params.name}
          onDelete={this.handleDeleteTask}
        />
        <br />
        <h6>Edit Baskets</h6>
        <EditBaskets //display all baskets and edit, delete them
          baskets={this.state.baskets}
          projectId={this.props.match.params.id}
          name={this.props.match.params.name}
          onDelete={this.handleDeleteBasket}
        />
      </div>
    );
  }
}

export default Project;
