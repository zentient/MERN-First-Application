// Required Imports
const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// First Route - this endpoint handles all income of http get request (localhost/exercises/)
router.route("/").get((req, res) => {
  Exercise.find() // mongoose method to get a list of all mongoDB atlas database
    .then((exercises) => res.json(exercises)) // the result returns in json format
    .catch((err) => res.status(400).json(`Error: ${err}`)); // errors handling
});

// Second Route - this endpoint handles all income of http post request (localhost/exercises/add)
router.route("/add").post((req, res) => {
  // Fields in the body
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.duration);

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

// Third Route - this endpoint handles the update operation with the dabatase through objectIDs
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Fourth Route - this endpoint handles the search of an specific record
router.route("/:id").get((req, res) => {
  // mongoose findById method will return the specific record
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise)) // then send in through JSON format
    .catch((err) => res.status(400).json(`Error: ${err}`)); // error handling
});

// Fifth Route - this endpoint handles the delete operation of an specific method
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id) // mongoose findByIdAndDelete method will delete the specific record
    .then(() => res.json("Exercise Deleted.")) // Send a response of success
    .catch((err) => res.status(400).json(`Error: ${err}`)); // error handling
});

module.exports = router; // exporting router for external usage
