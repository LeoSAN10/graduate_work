const LocationDataAccess = require("../data_requests/LocationDataAccess");
const ResponseCreator = require("../response_creators/ResponseCreator");

class LocationController {
  async allLocations(req, res, next) {
    const data = await LocationDataAccess.findAllLocations();
    return res.json(ResponseCreator.response(data));
  }

  async newLocation(req, res, next) {
    const { name } = req.body;
    try{
      const location = await LocationDataAccess.createLocation(name);
      return res.json(
        ResponseCreator.response({
          message: "Location created",
          location
        })
      );
    } catch(error) {
      return next(error);
    }
  }

  async deleteLocation(req, res, next) {
    const id  = req.param('id').slice(1);
    try {
      await LocationDataAccess.deleteLocationById(id);
      return res.json(
        ResponseCreator.response({ message: "Location deleted" })
      );
    } catch(error) {
      return next(error);
    }
  }
}

module.exports = new LocationController();
