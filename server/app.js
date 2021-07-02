const express = require("express");
const cors = require("cors");
const app = express();
const { model } = require("./model");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

module.exports = app;
