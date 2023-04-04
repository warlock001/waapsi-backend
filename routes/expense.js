const ExpenseRouter = require("express").Router();

const PostExpenseController = require("../controllers/PostExpenseController");
const GetExpenseController = require("../controllers/GetExpenseController");

ExpenseRouter.post("/postexpense", async (req, res) => {
  PostExpenseController.Execute(req, res);
});

ExpenseRouter.get("/getexpense", async (req, res) => {
  GetExpenseController.Execute(req, res);
});

module.exports = ExpenseRouter;
