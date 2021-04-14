const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
const router =require('./routes/posts.js')
const postsRoutes = require('./routes/posts')
const dotenv = require("dotenv");



const app = express();
app.use(cors());




app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use("/api", postsRoutes);


const PORT = process.env.PORT || 5000;

module.exports = app.listen(PORT, () =>
  console.log(`Connection is established and running on port: ${PORT}`)
);
