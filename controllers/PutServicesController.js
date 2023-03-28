const Service = require("../models/service");

class PostServiceController {
  static async Execute(req, res) {
    const { name, price } = req.body;
    const { id } = req.query;

    if (name != undefined && price != undefined && id != undefined) {
      Service.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name.trim(),
            price: price,
          },
        },
        { upsert: true }
      ).then((response, err) => {
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
