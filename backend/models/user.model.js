// Required Imports
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Schema (shape & content definition of a document) Creation
const userSchema = new Schema(
  {
    username: {
      type: String, // data type
      required: true, // required field
      unique: true, // unique field
      trim: true, // trims white space at the end of user input
      minlength: 5, // minimum input length
    },
  },
  {
    timestamps: true, // stamps for when the record was created/modified
  }
);

const User = mongoose.model("User", userSchema); // Schema ready to be exported
module.exports = User; // exporting schema for external usage
