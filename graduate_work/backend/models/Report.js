const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Report = sequelize.define("Report", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  reason: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Report;
