const { Location } = require("../models");
const { DAOError } = require("../error/DAOError");

class LocationDataAccess {
  findAllLocations() {
    return Location.findAll();
  }

  createLocation(name) {
    return Location.create({ name });
  }

  async deleteLocationById(id) {
    const location = await Location.destroy({
      where: {
        id,
      },
    });
    if (!location) throw DAOError.notFound("There is no location with this id");
    return location;
  }
}

module.exports = new LocationDataAccess();
