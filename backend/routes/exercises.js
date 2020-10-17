// Required Imports
const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// First Route - this endpoint handles all income of http get request (localhost/exercises/)
router.route("/").get((req, res) => {
  Exercise.find() // mongoose method to get a list of all mongoDB atlas database
    .then((exercises) => res.json(exercises)) // the result returns in json format
    .catch((err) => res.status(400).json(`Error: ${err}`)); // errors handling
});

// Second Route - this endpoint handles all income of http post request (localhost/exercises/)
router.route("/add").post((req, res) => {
  // Fields in the body
  const username = req.body.username;
  const description = req.bpdy.description;
  const duration = Number(req.body.duration);
  const date = Date(req.body.duration);

  // Creating new instance of Exercise
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save() // Finally exercise is saved to the database
    .then(() => res.json("Exercise Added!")) // Returning success response
    .catch((err) => res.status(400).json(`Error: ${err}`)); // errors handling
});

module.exports = router; // exporting router for external usage
