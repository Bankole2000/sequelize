const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Gig = db.define("gig", {
  title: {
    type: DataTypes.STRING
  },
  technologies: {
    type: DataTypes.STRING
  },
  budget: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  contact_email: {
    type: DataTypes.STRING
  }
  // created_at: {
  //   type: DataTypes.DATE
  // },
  // updated_at: {
  //   type: DataTypes.DATE
  // }
});

module.exports = Gig;
