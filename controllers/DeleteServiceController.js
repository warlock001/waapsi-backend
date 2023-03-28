const Service = require("../models/service");

class DeleteServiceController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (id) {
      Service.findByIdAndDelete({ _id: id }).then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          if (response) {
            res.status(200).json({
              message: `Service Deleted`,
            });
          } else {
            res.status(404).json({
              message: `not found`,
            });
          }
        }
      });
    } else {
      res.status(400).send({
        message: "Invalid request",
      });
    }
  }
}

module.exports = DeleteServiceController;
