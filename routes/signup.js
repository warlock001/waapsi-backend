const SignupRouter = require("express").Router();


const SignupController = require("../controllers/SignupController");

SignupRouter.post(
  "/signup",
  async (req, res) => {
      SignupController.Execute(req, res);
  }
);

module.exports = SignupRouter;
