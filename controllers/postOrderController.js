const Order = require("../models/order");

class PostOrderController {
  static async Execute(req, res) {
    const { phone, total } = req.body;

    if (phone && total) {
      const order = new Order({
        phone: phone,
        total: total,
      });

      order.save().then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).json({
            message: `new order saved`,
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

module.exports = PostOrderController;
