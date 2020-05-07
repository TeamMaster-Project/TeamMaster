import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTask, saveTask } from "../services/taskService";
import { getBaskets } from "../services/basketService";

class TaskForm extends Form {
  state = {
    task: "",
    data: {
      title: "",
      basketId: "",
      projectId: "",
      //deadline: "",
    },
    baskets: [],
    errors: {},
  };
  schema = {
    //Joi validate schema
    _id: Joi.string(),
    title: Joi.string().min(1).required().label("Title"),
    projectId: Joi.string().required().label("Project"),
    basketId: Joi.string().required().label("Baskets"),
  };

  async populateBaskets() {
    const { data: baskets } = await getBaskets();

    const filteredBaskets = await baskets.filter((basket) => {
      return basket.project._id == this.props.match.params.id; //According to passed project id throuh params
    });
    this.setState({ baskets: filteredBaskets });
  }

  async componentDidMount() {
    //call GetMethods
    const projectId = this.props.match.params.id;
    const datacopy = this.state.data;
    datacopy.projectId = projectId;

    await this.populateBaskets();

    try {
      const taskId = this.props.match.params.taskid;
      if (taskId === "new") {
        this.setState({ data: datacopy });
        return;
      }

      const { data: task } = await getTask(taskId);

      this.setState({
        data: {
          _id: task._id,
          title: task.title,
          projectId: projectId,
          basketId: task.basket._id,
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("not-found");
    }
  }

  doSubmit = () => {
    saveTask(this.state.data);
    this.props.history.push(
      `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}`
    );
  };

  render() {
    console.log(this.state.data);
    //console.log(this.state.task);
    return (
      <div className="container">
        <h1>Add New Task</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* name label datatype */}
            {this.renderInputs("title", "Title", "text")}
            {this.renderSelect(
              "basketId",
              "Relevent Basket",
              this.state.baskets
            )}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;