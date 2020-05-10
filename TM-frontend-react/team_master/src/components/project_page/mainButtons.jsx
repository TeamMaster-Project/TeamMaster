import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
class MainButtons extends Component {
  state = {
    currentUser: "",
  };
  async componentDidMount() {
    const currentUser = await auth.getCurrentUser();
    this.setState({ currentUser: currentUser });
  }
  render() {
    const { id, name, project } = this.props;
    console.log(this.state.currentUser);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 sm-6"></div>
          <div className="col-md-3 col-sm-6">
            <button className="button instagram">
              <span className="gradient"></span>
              <Link
                to={{
                  pathname: `/myprojects/${id}/${name}/newtask/new`,
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
                  pathname: `/myprojects/${id}/${name}/new`,
                }}
                style={{ color: "white" }}
              >
                New Basket
              </Link>
            </button>
          </div>

          {/* {project.moderators.map((moderator) => {
            if (moderator._id == this.state.currentUser._id) {
              return (
                <div key={moderator._id} className="col-md-3 col-sm-6">
                  <button className="button greenish">
                    <span className="gradient"></span>
                    <Link
                      to={{
                        pathname: `/myprojects/${id}/${name}/new`,
                      }}
                      style={{ color: "white" }}
                    >
                      New Basket
                    </Link>
                  </button>
                </div>
              );
            }
          })} */}

          <div className="col-md-3 sm-6"></div>
        </div>
      </div>
    );
  }
}

export default MainButtons;
