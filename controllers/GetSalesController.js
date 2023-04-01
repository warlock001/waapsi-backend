const Order = require("../models/order");

class GetSalesController {
  static async Execute(req, res) {
    function getLastMonday(dt) {
      let n = null; // last Monday conversion

      switch (dt.getDay()) {
        case 0:
          n = -5;
          break;
        case 1:
          n = -6;
          break;
        case 2:
          n = 0;
          break;
        case 3:
          n = -1;
          break;
        case 4:
          n = -2;
          break;
        case 5:
          n = -3;
          break;
        case 6:
          n = -4;
          break;
        default:
          "This never happens";
      }

      let today_date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
      let last_monday_date = today_date.setDate(today_date.getDate() + n);

      return last_monday_date;
    }

    const { period } = req.query;
    const { date } = req.query;

    const d = new Date();
    var LAST_MONDAY = getLastMonday(d);
    const thisMonth = d.getMonth() + 1;

    if (period == "thisMonth") {
      // Order.aggregate([
      //   { $addFields: { month: { $month: "$createdAt" } } },
      //   { $match: { month: thisMonth } },
      // ]).then((response, err) => {
      //   if (err) {
      //     return res.status(400).send(err);
      //   } else {
      //     res.status(200).json({
      //       services: response,
      //     });
      //   }
      // });

      var finalResponse = [];

      async function func() {
        for (let i = 1; i < 31; i++) {
          var today_date = new Date();
          const CustomDate = new Date(
            today_date.getFullYear() +
              "-" +
              (today_date.getMonth() + 1) +
              "-" +
              (i + 1)
          );
          var CustomDateMax;
          if (i == 30) {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                (today_date.getMonth() + 1) +
                "-" +
                31
            );
          } else {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                (today_date.getMonth() + 1) +
                "-" +
                (i + 2)
            );
          }

          console.log(CustomDate);
          console.log(CustomDateMax);
          await Order.find({
            createdAt: {
              $gte: CustomDate,
              $lt: CustomDateMax,
            },
          }).then((response) => {
            var Total = 0;
            console.log(response);
            response.forEach((item) => {
              Total = Total + item.total;
              console.log(Total + "is total");
            });
            if (Total) {
              finalResponse.push({ date: i, total: Total });
            }
          });
        }
      }

      await func().then(() => {
        console.log(finalResponse + "is finalResponse");
        res.status(200).json({
          services: finalResponse,
        });
      });
    } else if (period == "pastMonth") {
      // Order.aggregate([
      //   { $addFields: { month: { $month: "$createdAt" } } },
      //   { $match: { month: thisMonth - 1 } },
      // ]).then((response, err) => {
      //   if (err) {
      //     return res.status(400).send(err);
      //   } else {
      //     res.status(200).json({
      //       services: response,
      //     });
      //   }
      // });

      var finalResponse = [];

      async function func() {
        for (let i = 1; i < 31; i++) {
          var today_date = new Date();
          const CustomDate = new Date(
            today_date.getFullYear() +
              "-" +
              (today_date.getMonth() - 1) +
              "-" +
              (i + 1)
          );
          var CustomDateMax;
          if (i == 30) {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                (today_date.getMonth() - 1) +
                "-" +
                31
            );
          } else {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                (today_date.getMonth() - 1) +
                "-" +
                (i + 2)
            );
          }

          console.log(CustomDate);
          console.log(CustomDateMax);
          await Order.find({
            createdAt: {
              $gte: CustomDate,
              $lt: CustomDateMax,
            },
          }).then((response) => {
            var Total = 0;
            console.log(response);
            response.forEach((item) => {
              Total = Total + item.total;
              console.log(Total + "is total");
            });
            if (Total) {
              finalResponse.push({ date: i, total: Total });
            }
          });
        }
      }

      await func().then(() => {
        console.log(finalResponse + "is finalResponse");
        res.status(200).json({
          services: finalResponse,
        });
      });
    } else if (period == "thisWeek") {
      Order.aggregate([
        {
          $addFields: {
            last_monday: {
              $dateFromParts: {
                year: { $year: new Date(LAST_MONDAY) },
                month: { $month: new Date(LAST_MONDAY) },
                day: { $dayOfMonth: new Date(LAST_MONDAY) },
              },
            },
            created_at: {
              $dateFromParts: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
                day: { $dayOfMonth: "$createdAt" },
              },
            },
          },
        },
        {
          $match: { $expr: { $gt: ["$created_at", "$last_monday"] } },
        },
        {
          $project: { created_at: 0, last_monday: 0 },
        },
      ]).then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).json({
            services: response,
          });
        }
      });
    } else if (period == "customDate") {
      if (date) {
        const CustomDate = new Date(date);
        var tomorrow = new Date(CustomDate);
        tomorrow.setDate(CustomDate.getDate() + 1);
        tomorrow.toLocaleDateString();
        Order.find({
          createdAt: {
            $gte: CustomDate,
            $lt: tomorrow,
          },
        }).then((response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            res.status(200).json({
              services: response,
            });
          }
        });
      } else {
        res.status(400).send({
          message: "Invalid date",
        });
      }
    } else if (period == "startDate") {
      if (date) {
        const CustomDate = new Date(date);
        var tomorrow = new Date(CustomDate);
        tomorrow.setDate(CustomDate.getDate() + 1);
        tomorrow.toLocaleDateString();
        console.log(tomorrow);
        Order.find({
          createdAt: {
            $gte: CustomDate,
          },
        }).then((response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            res.status(200).json({
              services: response,
            });
          }
        });
      } else {
        res.status(400).send({
          message: "Invalid date",
        });
      }
    } else if (period == "endDate") {
      if (date) {
        const CustomDate = new Date(date);
        var tomorrow = new Date(CustomDate);
        tomorrow.setDate(CustomDate.getDate() + 1);
        tomorrow.toLocaleDateString();
        console.log(tomorrow);
        Order.find({
          createdAt: {
            $lt: tomorrow,
          },
        }).then((response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            res.status(200).json({
              services: response,
            });
          }
        });
      } else {
        res.status(400).send({
          message: "Invalid date",
        });
      }
    } else {
      res.status(400).send({
        message: "Invalid period",
      });
    }
  }
}

module.exports = GetSalesController;
