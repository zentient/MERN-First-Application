// Required Imports
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

// Routers
const userRouter = require('./routes/users')
const exerciseRouter = require('./routes/exercises')

require("dotenv").config();

//  initializing app & port
const app = express();
const port = process.env.PORT || 2200;

app.use(cors());
app.use(express.json());

// mongoose connection to MongoDB configuration
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection establised successfully.')
})

// Routers usage
app.use('/users', userRouter)
app.use('/exercises', exerciseRouter)

// server running 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
