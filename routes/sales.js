const SalesRouter = require("express").Router();

const getSalesController = require("../controllers/GetSalesController");

SalesRouter.get("/sales", async (req, res) => {
  getSalesController.Execute(req, res);
});

module.exports = SalesRouter;
