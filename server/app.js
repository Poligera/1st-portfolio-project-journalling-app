const express = require("express");
const cors = require("cors");
const app = express();
const { model } = require("./model");
const data = require("../data.json")

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send(data))

module.exports = app;
