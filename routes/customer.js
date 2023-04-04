const CustomerRouter = require("express").Router();

const GetCustomerController = require("../controllers/GetCustomerController");

CustomerRouter.get("/customers", async (req, res) => {
  GetCustomerController.Execute(req, res);
});

module.exports = CustomerRouter;
