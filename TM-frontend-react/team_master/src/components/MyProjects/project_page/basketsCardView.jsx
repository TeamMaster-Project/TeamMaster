import React, { Component } from "react";
import { Link } from "react-router-dom";
class BasketsCardView extends Component {
  render() {
    const {
      baskets,
      tasks,
      projectId,
      name,
      onDelete,
      isaModerator,
    } = this.props;
    return (
      <div className="">
        <div className="row">
          {baskets.map((basket) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-sm" key={basket._id}>
              <table className="table card shadow-lg">
                <thead>
                  <tr>
                    <th>{basket.name}</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => {
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
                                pathname: `/myprojects/${projectId}/${name}/${basket._id}/${task._id}`,
                              }}
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                              {/* edit mark */}
                            </Link>
                          </td>
                          {isaModerator && (
                            <td style={{ width: "25px" }}>
                              <button
                                onClick={() => onDelete(task)}
                                className="btn btn-light btn-sm"
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                                {/* Delete icon */}
                              </button>
                            </td>
                          )}
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
    );
  }
}

export default BasketsCardView;
