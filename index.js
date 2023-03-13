const express = require('express')
const app = express()
const dotenv = require("dotenv");
var cors = require("cors");
const port = 3000

dotenv.config();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

var bodyParser = require("body-parser");
const mongoose = require("mongoose");


const signupRouter = require("./routes/signup");


app.use(signupRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   