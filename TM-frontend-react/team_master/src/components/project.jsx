import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets, deleteBasket } from "../services/basketService";
import { getTasks, deleteTask } from "../services/taskService";
import { toast } from "react-toastify";

import "../styles/buttons/liquidbutton.css";

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
        <div className="card text-center my-3 mx-5 projectsummery">
          <div className="card-header">
            <h3>
              {this.props.match.params.name}{" "}
              <span>
                <Link to="#" className="btn btn-sm btn-light ">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  {/* edit mark */}
                </Link>
              </span>
            </h3>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.location.description}</p>
          </div>
        </div>
        {infoBox}
        <div className="container">
          <div className="row">
            <div className="col-md-3 sm-6"></div>
            <div className="col-md-3 col-sm-6">
              <button className="button instagram">
                <span className="gradient"></span>
                <Link
                  to={{
                    pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}/newtask/new`,
                  }}
                  style={{ color: "white" }}
                >
                  New Task
                </Link>
              </button>
            </div>
            <div className="col-md-3 col-sm-6">
              <button className="button greenish">
                <span className="gradient"></span>
                <Link
                  to={{
                    pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}/new`,
                  }}
                  style={{ color: "white" }}
                >
                  New Basket
                </Link>
              </button>
            </div>
            <div className="col-md-3 sm-6"></div>
          </div>
        </div>
        <br /> <h6>Baskets With Tasks</h6>
        <div className="">
          <div className="row">
            {this.state.baskets.map((basket) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-sm"
                key={basket._id}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>{basket.name}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.tasks.map((task) => {
                      if (task.basket._id == basket._id) {
                        return (
                          <tr key={task._id}>
                            <td>
                              <i>{task.title}</i>
                            </td>
                            {/* <td>
                              <i>{task.deadline}</i>
                            </td> */}
                            <td style={{ width: "25px" }}>
                              <Link
                                className="btn btn-sm btn-light"
                                to={{
                                  pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}/${basket._id}/${task._id}`,
                                }}
                              >
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                ></i>
                                {/* edit mark */}
                              </Link>
                            </td>

                            <td style={{ width: "25px" }}>
                              <button
                                onClick={() => this.handleDeleteTask(task)}
                                className="btn btn-light btn-sm"
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                                {/* Delete icon */}
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
        <br />
        <h6>Edit Baskets</h6>
        <div className="container">
          <table className="table container">
            <thead>
              <tr>
                <th>Baskets</th>
              </tr>
            </thead>
            <tbody>
              {this.state.baskets.map((basket) => (
                <tr key={basket._id}>
                  <td>{basket.name}</td>
                  <td style={{ width: "25px" }}>
                    <Link
                      className="btn btn-sm btn-light"
                      to={{
                        pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}/${basket._id}`,
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td style={{ width: "50px" }}>
                    <button
                      onClick={() => this.handleDeleteBasket(basket)}
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

export default Project;
