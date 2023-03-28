const LoginRouter = require("express").Router();

const LoginController = require("../controllers/LoginController");

LoginRouter.post("/login", async (req, res) => {
  LoginController.Execute(req, res);
});

module.exports = LoginRouter;
