const User = require("../models/user");

class PutUserController {
    static async Execute(req, res) {
        const { name, email, companyName, dialCode, mobile, } = req.body;
        const { id } = req.query;

        if (!name || !email || !companyName || !dialCode || !mobile || !id) {

            res.status(400).send({
                message: "Invalid request",
            });


        } else {
            User.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        name: name.trim(),
                        email: email,
                        companyName: companyName,
                        dialCode: dialCode,
                        mobile: mobile,
                    },
                },
                { upsert: true }
            ).then((response, err) => {
                if (err) {
                    return res.status(400).send(err);
                } else {
                    res.status(200).json({
                        message: `User Updated`,
                    });
                }
            });
        }
    }
}

module.exports = PutUserController;
