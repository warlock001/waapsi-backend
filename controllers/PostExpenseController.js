const Expense = require("../models/expense");

class PostExpenseController {
  static async Execute(req, res) {
    const { category, note, price } = req.body;

    if (category && note && price) {
      const expense = new Expense({
        category: category,
        note: note,
        price: price,
      });

      expense.save().then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).json({
            message: `new expense saved`,
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

module.exports = PostExpenseController;
