const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

// bring in the database
const db = require("../config/database");

// bring in the necessary model
const Gig = require("../models/Gig");

// Get all gigs as array
router.get("/", (req, res) => {
  Gig.findAll()
    .then((gigs) => {
      console.log(gigs);
      res.render("gigs", {
        gigs: gigs.map((gig) => gig.toJSON())
      });
      // res.sendStatus(200);
    })
    .catch((err) => console.log(err));
  // res.send("Gigs works");
});

// Search gigs
router.get("/search", (req, res) => {
  let { term } = req.query;
  term = term.toLocaleLowerCase();
  Gig.findAll({
    where: {
      technologies: {
        [Op.like]: `%${term}%`
      }
    }
  })
    .then((gigs) => {
      res.render("gigs", {
        gigs: gigs.map((gig) => gig.toJSON())
      });
    })
    .catch((err) => console.log(err));
});

// Render add gig form
router.get("/addgig", (req, res) => {
  res.render("add");
});

// Add a gig after submitting form
router.post("/addgig", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please some tecnologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }
    // Make lowercase and remove spaces after coma
    technologies = technologies.toLowerCase().replace(/, /g, ",");

    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then((gig) => {
        // res.send(`Created gig with Id of ${gig.id}`);
        res.redirect("/gigs");
      })
      .catch((err) => console.log(err));
  }
  // insert into table
});

// Add a gig (demo - use post instead)
// router.get("/addgig", (req, res) => {
//   const data = {
//     title: "simple wordpress website",
//     technologies: "Wordpress, PHP, HTML, CSS",
//     budget: "$1000",
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, molestias! Facilis excepturi magnam mollitia ipsum dolores reiciendis ea quidem? Autem?",
//     contact_email: "user2@gmail.com"
//   };
//   let { title, technologies, budget, description, contact_email } = data;

//   // insert into table
//   Gig.create({
//     title,
//     technologies,
//     budget,
//     description,
//     contact_email
//   })
//     .then((gig) => {
//       res.send(`Created gig with Id of ${gig.id}`);
//       // res.redirect('/gigs');
//     })
//     .catch((err) => console.log(err));
// });

module.exports = router;
