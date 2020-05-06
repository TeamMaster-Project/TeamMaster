import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets, deleteBasket } from "../services/basketService";
import { toast } from "react-toastify";
import "../styles/buttons/liquidbutton.css";

class Project extends Component {
  state = {
    projectName: "",
    baskets: [],
  };
  async componentDidMount() {
    const projectName = this.props.location.projectName;
    const { data: baskets } = await getBaskets();

    const filtered = baskets.filter((basket) => {
      return basket.project._id == this.props.match.params.id;
    });
    this.setState({ baskets: filtered, projectName: projectName });
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
    if (this.state.baskets.length === 0) return <p>There are no baskets yet</p>;
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
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <button className="button instagram">
                <span className="gradient"></span>New Task
              </button>
            </div>
            <div className="col-md-4">
              <button className="button greenish">
                <span className="gradient"></span>
                <Link
                  to={{
                    pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}/new`,
                  }}
                  style={{ color: "white" }}
                >
                  Add New Basket
                </Link>
              </button>
            </div>
            <div className="col-md-4">
              <button className="button greenish">
                <span className="gradient"></span>Edit Baskets
              </button>
            </div>
          </div>
        </div>

        <h3>Edit Baskets</h3>
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
        <h3>Baskets With Tasks</h3>
        {this.state.baskets.map((basket) => (
          <table className="table container" key={basket._id}>
            <thead>
              <tr>
                <th>{basket.name}</th>
              </tr>
            </thead>
          </table>
        ))}
      </div>
    );
  }
}

export default Project;
