import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBaskets, deleteBasket } from "../services/basketService";
import { toast } from "react-toastify";
import "../App.css";

class Project extends Component {
  state = {
    projectName: "",
    baskets: [],
  };
  async componentDidMount() {
    const { data: baskets } = await getBaskets();

    const filtered = baskets.filter((basket) => {
      return basket.project._id == this.props.match.params.id;
    });
    this.setState({ baskets: filtered });
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
                      Edit Basket
                    </button>
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
