const path = require("path");
const fs = require('fs');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// routes
const notes = require("./routes/notes");
const getCollection = require("./utils").getCollection;

// serving static files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setting template engine
app.set("view engine", "pug");

// notes urls
app.use("/", notes);

app.get("/", (req, res) => {
    res.render("index", { notes: notes });
  });
  
  // listen for requests :)
  const listener = app.listen(8000, () => {
    console.log(`App is listening on port  http://localhost:8000`);
  });