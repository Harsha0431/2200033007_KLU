const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

dotenv.config()

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



const port = process.env.PORT
app.listen(port, ()=>{
    console.log("Server listening on port " + port);
})
