const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const port = 3000;

dotenv.config();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const signupRouter = require("./routes/signup");
const LoginRouter = require("./routes/login");
const service = require("./routes/service");

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb" }));

app.use(signupRouter);
app.use(LoginRouter);
app.use(service);

app.listen(process.env.API_PORT, (error) => {
  if (error) {
    console.error("Error Occurred while connecting to server: ", error);
  } else {
    console.log("Connected to Server Successfully!");

    console.log("Trying to connect to database server...");

    mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to database");
  }
});
