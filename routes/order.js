const OrderRouter = require("express").Router();

const postOrderController = require("../controllers/postOrderController");
const GetOrderController = require("../controllers/GetOrderController");

OrderRouter.post("/postorder", async (req, res) => {
  postOrderController.Execute(req, res);
});

OrderRouter.get("/getorder", async (req, res) => {
  GetOrderController.Execute(req, res);
});

module.exports = OrderRouter;
