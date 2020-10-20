// Required Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// Port
const port = process.env.PORT || 2200;

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:${port}/exercises`)
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    axios
      .delete(`http://localhost:${port}/exercises/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  render() {
    return (
      <div>
        <h1>Exercises List</h1>
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Date</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((ex) => {
              return (
                <tr key={ex._id}>
                  <th scope="row">{ex.username}</th>
                  <td>{ex.description}</td>
                  <td>{ex.duration} mins</td>
                  <td>{ex.date}</td>
                  <td className="d-flex">
                    <Link
                      to={`/edit/${ex._id}`}
                      className="mr-2 btn btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      className="ml-2 btn btn-danger"
                      onClick={() => this.deleteExercise(ex._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
