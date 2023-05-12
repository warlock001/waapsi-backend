const Service = require("../models/service");

class GetServiceController {
  static async Execute(req, res) {
    Service.find().sort({ name: 'asc' }).then((response, err) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).json({
          services: response,
        });
      }
    });
  }
}

module.exports = GetServiceController;
