const Order = require("../models/order");

class GetOrderController {
  static async Execute(req, res) {
    const { daysLimit } = req.query;

    if (daysLimit) {

      const CustomDate = new Date(daysLimit);
      console.log(CustomDate)

      Order.aggregate([
        {
          $match: { createdAt: { $gte: new Date(CustomDate), } }
        },

        {
          $group: {
            _id: "$phone",
            order: { $first: "$$ROOT" },
          },
        },
        { $sort: { createdAt: -1 } },

      ]).sort({ createdAt: 'desc' }).then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          console.log(response)
          res.status(200).json({
            order: response,
          });
        }
      });






    } else {
      Order.aggregate([

        {
          $group: {
            _id: "$phone",
            order: { $first: "$$ROOT" },
          },
        },
        { $sort: { createdAt: 1 } },
      ]).sort({ createdAt: 'asc' }, (response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).json({
            order: response,
          });
        }
      })
    }
  }
}

module.exports = GetOrderController;
