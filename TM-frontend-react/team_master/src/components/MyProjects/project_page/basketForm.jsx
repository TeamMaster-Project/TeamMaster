import React, { Component } from "react";
import Form from "../../Common/form";
import Joi from "joi-browser";
import { getBasket, saveBasket } from "../../../services/basketService";
import "./index.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class BasketForm extends Form {
  state = {
    data: {
      name: "",
      projectId: "",
    },
    errors: {},
  };
  schema = {
    //Joi validate schema
    _id: Joi.string(),
    name: Joi.string().min(1).required().label("Name"),
    projectId: Joi.string().required().label("ProjectId"),
  };

  async componentDidMount() {
    //call GetMethods
    const projectId = this.props.match.params.id;
    const datacopy = this.state.data;
    datacopy.projectId = projectId;

    try {
      const basketId = this.props.match.params.basketid;
      if (basketId === "new") {
        this.setState({ data: datacopy });
        return;
      }

      const { data: basket } = await getBasket(basketId);
      //   this.setState({
      //     data: {
      //       _id: basket._id,
      //       name: basket.name,
      //       projectId: basket.project._id,
      //     },
      //   });

      this.setState({
        data: this.mapToViewModel(basket),
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(basket) {
    return {
      _id: basket._id,
      name: basket.name,
      projectId: basket.project._id,
    };
  }

  doSubmit = async () => {
    await saveBasket(this.state.data);
    toast("Basket Successfully Updated");

    this.props.history.push(
      `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}`
    );
  };

  render() {
    console.log(this.state.data);
    return (
      <div className="center-container">
        <div className="shadow-box" ></div>
        <div className="register-form-card shadow">
          <div className="register-form">
            <h1>Save Basket</h1>
            <div>
              <form onSubmit={this.handleSubmit}>
                {/* name, label, datatype */}

                {this.renderInputs("name", "Name", "text")}
                {this.renderButton("Save")}
                <Link
                  to={{
                    pathname: `/myprojects/${this.props.match.params.id}/${this.props.match.params.name}`,
                  }}
                  className="btn btn-md btn-outline-primary m-2 shadow"
                  style={{ marginBottom: 20 }}
                >
                Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BasketForm;
