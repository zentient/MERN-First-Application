// Required Imports
import React, { Component } from "react";
import axios from "axios";
// Importing the custom DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Port
const port = process.env.PORT || 2200;

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:${port}/exercises/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => console.log(err));
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedExercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post(
        `http://localhost:${port}/exercises/update/${this.props.match.params.id}`,
        updatedExercise
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
    console.log(updatedExercise);
  }

  render() {
    return (
      <div>
        <h1>Edit Exercise</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input className="form-control" type="text" placeholder={this.state.username} readOnly />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (mins): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
