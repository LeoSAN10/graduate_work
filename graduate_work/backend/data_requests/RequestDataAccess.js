const { Request, User } = require("../models");
const { Op } = require("sequelize");
const { DAOError } = require("../error/DAOError");

class RequestDataAccess {
  createRequest(
    name,
    description,
    address,
    startDate,
    endDate,
    CategoryId,
    LocationId,
    UserId,
    picture
  ) {
    return Request.create({
      name,
      description,
      address,
      startDate,
      endDate,
      CategoryId,
      LocationId,
      UserId,
      picture
    });
  }


  async findRequestById(id) {
    const request = await Request.findOne({
      where: {
        id,
      },
      include: {
        model:User,
        where: {
          isBlocked: {
            [Op.eq]: false
          },
        },
        attributes: ['id', 'email', 'name', 'phone', 'profileColor']
      }
    });
    if (!request) throw DAOError.notFound("There is no request with this id");
    return request;
  }

  getRequests (locations, categories, order, isActive, search, UserId, limit, offset) {
    const whereData = {};
    if(locations) whereData["LocationId"] = locations;
    if(categories) whereData["CategoryId"] = categories;
    if(isActive) whereData["active"] = isActive;
    if(search) {
      whereData["name"] = {
        [Op.or]: [
          {[Op.substring]: search},
          {[Op.substring]: search[0].toUpperCase() + search.slice(1)},
        ]
      }
    }
    if(UserId) whereData["UserId"] = UserId;

    let findData = {where: whereData};
    if(order) {
      findData["order"] = [['updatedAt', order]];
    }
    if(limit) findData["limit"] = limit;
    if(offset) findData["offset"] = offset;
    findData["include"] = {
      model:User,
      where: {
        isBlocked: {
          [Op.eq]: false
        },
      },
      attributes: []
    }
    return Request.findAndCountAll(findData);
  }
}

module.exports = new RequestDataAccess();
