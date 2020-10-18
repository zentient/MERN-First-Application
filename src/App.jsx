// Required Imports
import React, { Component } from "react";
import "./App.css";
// Bootstrap & Routing
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <br />
        <div className="container">
          <Route path="/" exact component={ExerciseList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>
    );
  }
}
