// Required Imports
const router = require("express").Router();
let User = require("../models/user.model");

// First Route - this endpoint handles all income of http get request (localhost/users/)
router.route("/").get((req, res) => {
  User.find() // mongoose method to get a list of all mongoDB atlas database
    .then((users) => res.json(users)) // the result returns in json format
    .catch((err) => res.status(400).json(`Error: ${err}`)); // errors handling
});

// Second Route - this endpoint handles all income of http post request (localhost/users/)
router.route("/add").post((req, res) => {
  //the new username is part of the request body
  const username = req.body.username; // assigned to this variable
  // Creating new instance of user
  const newUser = new User({ username });
  newUser
    .save() // Finally user is saved to the database
    .then(() => res.json("User Added!")) // Returning success response
    .catch((err) => res.status(400).json(`Error: ${err}`)); // errors handling
});

module.exports = router; // exporting router for external usage
