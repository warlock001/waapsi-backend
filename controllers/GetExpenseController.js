const Expense = require("../models/expense");

class GetExpenseController {
  static async Execute(req, res) {
    Expense.find().then((response, err) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).json({
          expense: response,
        });
      }
    });
  }
}

module.exports = GetExpenseController;
