const User = require("../models/user");

class GetUserController {
    static async Execute(req, res) {
        const { id } = req.query;
        if (id) {
            User.find({ _id: id }).then((response, err) => {
                if (err) {
                    return res.status(400).send(err);
                } else {
                    res.status(200).json({
                        user: response,
                    });
                }
            });
        } else {
            res.status(400).send({
                message: "Invalid request",
            });
        }

    }
}

module.exports = GetUserController;
