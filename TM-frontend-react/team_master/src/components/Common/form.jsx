import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    //Using joi-browser
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //name will become key
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); //Preventing page reload when submit

    //validate on submit
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //If truthy use errors object, if no errors use empty object{}
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //when moving from one input field to another
    //current target renamed as input(otherwise use current target in everywere that uses input in this block)

    //validate on change
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data }; //cloning before setState
    // data.username = e.currentTarget.value;//Use brackets to get dynamiic values
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderSelect(name, label, options) {
    //Select items from another scheme for this scheme as a selection(ex:baskets to tasks) add form
    const { data, errors } = this.state; //Destructuring
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInputs(name, label, type = "text") {
    const { data, errors } = this.state; //Destructuring
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
