const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// import database
const db = require("./config/database");

// Test db connection
db.authenticate()
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((err) => console.log(`err => ${err}`));

const app = express();

// Middle ware for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Middle ware for bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

// Gig routes - using gigs.js file
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started at port ${PORT}`));
console.log("Working...");
