const express = require("express");
var cors = require("cors");

const bodyParser = require("body-parser");
const config = require("./config/config");

// const path = require("path");
const indexRoute = require("./routes");
// const db = require('./config/dbConnection')
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));


// define a simple route
app.use("/api", indexRoute);

// listen for requests
app.listen(config.port, () => {
  // console.log('Server is listening on port ' + config.port);
  console.log("Listening on " + config.port);
});
