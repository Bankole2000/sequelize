const { Sequelize } = require("sequelize");

module.exports = new Sequelize("sequelize", "root", "root", {
  host: "192.168.64.2",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
