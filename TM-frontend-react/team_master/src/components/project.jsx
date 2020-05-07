import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets, deleteBasket } from "../services/basketService";
import { getTasks, deleteTasks } from "../services/taskService";
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

  handleDelete = async (basket) => {
    const originalBaskets = this.state.baskets;
    const baskets = originalBaskets.filter((m) => m._id !== basket._id);
    this.setState({ baskets: baskets }); //Baskets object override by baskets without the one we selected to delete

    try {
      await deleteBasket(basket._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This basket is already deleted"); //Expected error handle

      this.setState({ basket: originalBaskets });
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
            <h3>{this.props.match.params.name}</h3>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.location.description}</p>
            <a href="#" className="btn btn-primary disabled">
              Edit Project
            </a>
          </div>
        </div>
        {infoBox}
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4">
              <button className="button instagram">
                <span className="gradient"></span>New Task
              </button>
            </div>
            <div className="col-md-4 col-sm-4">
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
            <div className="col-md-4 col-sm-4">
              <button className="button greenish">
                <span className="gradient"></span>Edit Baskets
              </button>
            </div>
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
                            <td>{task.title}</td>
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
                  <td>
                    <Link
                      className="btn btn-sm btn-light"
                      to={{
                        pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}/${basket._id}`,
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(basket)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete Basket
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
