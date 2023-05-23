const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Replies = sequelize.define("Replies", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING},
  phone: { type: DataTypes.STRING}
});

module.exports = Replies;
