// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');



// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const pool = new Pool(dbParams);
pool.connect();

// Cookie for simulating login
const cookieSession = require("cookie-session");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2", "key3", "key4", "key5"],
  maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");
const loginRoutes = require("./routes/login");
// const registerRoutes = require("./routes/register");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(pool));
app.use("/api/todos", todosRoutes(pool));
app.use("/login", loginRoutes(pool));
// app.use("/register", registerRoutes(pool));
// Note: mount other resources here, using the same pattern above


// Home page
app.get("/", (req, res) => {
  const templateVars = {
    user_id: req.session.user_id,
    index: true
  };
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
