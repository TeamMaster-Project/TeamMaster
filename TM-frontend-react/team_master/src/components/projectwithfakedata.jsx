import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets } from "../services/fake2BasketService";
import "../App.css";

class Project extends Component {
  state = {
    projectName: "",
    baskets: [],
  };
  componentDidMount() {
    //this.setState({ baskets: getBaskets() });
    var baskets = getBaskets();
    var filtered = baskets.filter((basket) => {
      return basket.project._id == this.props.match.params.id;
    });
    this.setState({ baskets: filtered });
  }

  render() {
    if (this.state.baskets.length === 0) return <p>There are no baskets yet</p>;
    return (
      <div>
        <h1>
          Project -{" "}
          <span className="projectName">{this.props.match.params.name}</span>{" "}
        </h1>
        <div className="row">
          <table className="table container">
            <thead>
              <tr>
                <th>Baskets</th>
              </tr>
            </thead>
            <tbody>
              {this.state.baskets.map((basket) => (
                <tr key={basket._id}>
                  <td>
                    <Link to={`/mybaskets/${basket._id}`}>{basket.name}</Link>
                  </td>

                  <td>
                    <button
                      //   onClick={() => this.handleEdit(project)}
                      className="btn btn-success btn-sm"
                    >
                      Edit Project
                    </button>
                  </td>
                  <td>
                    <button
                      //   onClick={() => this.handleDelete(project)}
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
