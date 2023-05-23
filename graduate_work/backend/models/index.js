const sequelize = require("../db");

let models = ["User", "Request", "Category", "Location", "Reply", "Report"];

models.forEach(function (model) {
  module.exports[model] = require(__dirname + "/" + model);
});

(function (m) {
  m.Request.belongsTo(m.User);
  m.Request.belongsTo(m.Category);
  m.Request.belongsTo(m.Location);
  m.User.hasMany(m.Request);
  m.Category.hasMany(m.Request);
  m.Location.hasMany(m.Request);
  
  m.Reply.belongsTo(m.User);
  m.Reply.belongsTo(m.Request);
  m.Request.hasMany(m.Reply);
  m.User.hasMany(m.Reply);

  m.Report.belongsTo(m.User, {foreignKey: "UserRequestOwnerId"});
  m.Report.belongsTo(m.User, {foreignKey: "UserReportCreatorId"});
  m.Report.belongsTo(m.Request);
  m.Request.hasMany(m.Report);
  m.User.hasMany(m.Report, {foreignKey: "UserReportCreatorId"});
  m.User.hasMany(m.Report, {foreignKey: "UserRequestOwnerId"});
})(module.exports);
