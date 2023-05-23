const { Report} = require("../models");
const { DAOError } = require("../error/DAOError");

class ReportDataAccess {
  createReport(reason, requestOwnerId, reportCreatorId, requestId) {
    return Report.create({ 
        reason,
        UserRequestOwnerId: requestOwnerId,
        UserReportCreatorId: reportCreatorId,
        RequestId: requestId
     });
  }

  findReportsForUser(requestOwnerId) {
    return Report.findAndCountAll({
      where: {
        UserRequestOwnerId: requestOwnerId,
      },
    });
  }

  findReportByRequestOwnerIdAndReportCreatorId(requestOwnerId, reportCreatorId) {
    return Report.findOne({
      where: {
        UserRequestOwnerId: requestOwnerId,
        UserReportCreatorId: reportCreatorId,
      },
    });
  }
}

module.exports = new ReportDataAccess();
