const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')

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

// Routes

const aggreationController = require('./controller/aggregationController');
app.get('/stocks/:ticker', aggreationController.getAvgStockPriceController);
