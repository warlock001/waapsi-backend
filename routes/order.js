const OrderRouter = require("express").Router();

const postOrderController = require("../controllers/postOrderController");

OrderRouter.post("/postorder", async (req, res) => {
  postOrderController.Execute(req, res);
});

module.exports = OrderRouter;
