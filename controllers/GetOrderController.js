const Order = require("../models/order");

class GetOrderController {
  static async Execute(req, res) {
    const { daysLimit } = req.body;

    if (daysLimit) {
    } else {
      Order.aggregate([
        { $sort: { phone: 1, _id: -1 } },
        {
          $group: {
            _id: "$phone",
            order: { $first: "$$ROOT" },
          },
        },
      ]).then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).json({
            order: response,
          });
        }
      });
    }
  }
}

module.exports = GetOrderController;
