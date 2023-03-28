const ServiceRouter = require("express").Router();

const PostServiceController = require("../controllers/PostServiceController");
const GetServicesController = require("../controllers/GetServicesController");
const PutServicesController = require("../controllers/PutServicesController");

ServiceRouter.post("/postservice", async (req, res) => {
  PostServiceController.Execute(req, res);
});

ServiceRouter.get("/getservice", async (req, res) => {
  GetServicesController.Execute(req, res);
});

ServiceRouter.put("/putservice", async (req, res) => {
  PutServicesController.Execute(req, res);
});

module.exports = ServiceRouter;
