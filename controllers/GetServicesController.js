const Service = require("../models/service");

class PostServiceController {
  static async Execute(req, res) {
    Service.find().then((response, err) => {
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

module.exports = PostServiceController;
