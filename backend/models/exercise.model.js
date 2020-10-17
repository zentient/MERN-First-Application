// Required Imports
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Schema (shape & content definition of a document) Creation
const exerciseSchema = new Schema(
  {
    // field type definition & wheter it's required or not
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true, // stamps for when the record was created/modified
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema); // Schema ready to be exported
module.exports = Exercise; // exporting schema for external usage
