const UserRouter = require("express").Router();


const GetUserController = require("../controllers/GetUserController");
const PutUserController = require("../controllers/PutUserController");

UserRouter.get(
    "/user",
    async (req, res) => {
        GetUserController.Execute(req, res);
    }
);


UserRouter.put(
    "/user",
    async (req, res) => {
        PutUserController.Execute(req, res);
    }
);

module.exports = UserRouter;
