const Service = require("../models/service");

class PostServiceController {
  static async Execute(req, res) {
    const { name, price } = req.body;

    if (name && price) {
      const service = new Service({
        name: name.trim(),
        price: price,
      });

      service.save().then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).json({
            message: `new service saved`,
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Invalid request",
      });
    }
  }
}

module.exports = PostServiceController;
