// Required Imports
import React, { Component } from "react";
import axios from "axios";
// Importing the custom DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Port
const port = process.env.PORT || 2200;

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
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
    axios.get(`http://localhost:${port}/users/`)
      .then((res) => {
        if(res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.username),
            username: res.data[0].username
          })
        } 
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
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
    const newExercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios.post(`http://localhost:${port}/exercises/add`, newExercise)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    window.location = "/";
    console.log(newExercise);
  }

  render() {
    return (
      <div>
        <h1>Create New Exercise</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
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
              value="Create Exercise"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
