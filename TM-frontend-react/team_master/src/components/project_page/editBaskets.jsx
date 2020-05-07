import React, { Component } from "react";
import { Link } from "react-router-dom";
class EditBaskets extends Component {
  render() {
    const { baskets, projectId, name } = this.props;

    return (
      <div className="container">
        <table className="table container">
          <thead>
            <tr>
              <th>Baskets</th>
            </tr>
          </thead>
          <tbody>
            {baskets.map((basket) => (
              <tr key={basket._id}>
                <td>{basket.name}</td>
                <td style={{ width: "25px" }}>
                  <Link
                    className="btn btn-sm btn-light"
                    to={{
                      pathname: `/myprojects/${projectId}/${name}/${basket._id}`,
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
    );
  }
}

export default EditBaskets;
