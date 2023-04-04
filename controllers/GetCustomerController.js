const User = require("../models/user");

class GetUserController {
  static async Execute(req, res) {
    const { period } = req.query;
    const { date } = req.query;

    console.log(req.route.path);
    console.log("Period : " + period);
    console.log("Date : " + date);
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

    const d = new Date();
    const thisMonth = d.getMonth() + 1;
    var LAST_MONDAY = getLastMonday(d);
    var LAST_MONDAY_Date = new Date(LAST_MONDAY);
    var NEXT_SUNDAY_Date = new Date(LAST_MONDAY_Date);
    NEXT_SUNDAY_Date.setDate(NEXT_SUNDAY_Date.getDate() + 6);
    NEXT_SUNDAY_Date.setHours("4");
    NEXT_SUNDAY_Date.setMinutes("59");
    NEXT_SUNDAY_Date.setSeconds("59");
    LAST_MONDAY_Date.setDate(LAST_MONDAY_Date.getDate() - 1);
    LAST_MONDAY_Date.setHours(5);

    if (period == "thisMonth") {
      var finalResponse = [];

      async function func() {
        for (let i = 1; i < 31; i++) {
          var today_date = new Date();
          const CustomDate = new Date(
            today_date.getFullYear() +
              "-" +
              (today_date.getMonth() + 1) +
              "-" +
              i +
              ", 05:00:00"
          );
          var CustomDateMax;
          if (i == 30) {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                (today_date.getMonth() + 1) +
                "-" +
                31 +
                ", 05:00:00"
            );
          } else {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                (today_date.getMonth() + 1) +
                "-" +
                (i + 1) +
                ", 05:00:00"
            );
          }

          await User.find({
            createdAt: {
              $gte: CustomDate,
              $lt: CustomDateMax,
            },
          }).then((response) => {
            var Total = 0;
            response.forEach((item) => {
              Total = Total + 1;
            });
            if (Total) {
              finalResponse.push({
                date:
                  i.toString() +
                  "/" +
                  (today_date.getMonth() + 1).toString() +
                  "/" +
                  today_date.getFullYear().toString(),
                total: Total,
              });
            }
          });
        }
      }

      await func().then(() => {
        res.status(200).json({
          sales: finalResponse,
        });
      });
    } else if (period == "pastMonth") {
      var finalResponse = [];

      async function func() {
        for (let i = 1; i < 31; i++) {
          var today_date = new Date();
          const CustomDate = new Date(
            today_date.getFullYear() +
              "-" +
              today_date.getMonth() +
              "-" +
              i +
              ", 05:00:00"
          );
          var CustomDateMax;
          if (i == 30) {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                today_date.getMonth() +
                "-" +
                31 +
                ", 05:00:00"
            );
          } else {
            CustomDateMax = new Date(
              today_date.getFullYear() +
                "-" +
                today_date.getMonth() +
                "-" +
                (i + 1) +
                ", 05:00:00"
            );
          }

          await User.find({
            createdAt: {
              $gte: CustomDate,
              $lt: CustomDateMax,
            },
          }).then((response) => {
            var Total = 0;
            response.forEach((item) => {
              Total = Total + 1;
            });
            if (Total) {
              finalResponse.push({
                date:
                  i.toString() +
                  "/" +
                  (today_date.getMonth() + 1).toString() +
                  "/" +
                  today_date.getFullYear().toString(),
                total: Total,
              });
            }
          });
        }
      }

      await func().then(() => {
        res.status(200).json({
          sales: finalResponse,
        });
      });
    } else if (period == "thisWeek") {
      User.find({
        createdAt: {
          $gte: LAST_MONDAY_Date,
          $lt: NEXT_SUNDAY_Date,
        },
      }).then((response, err) => {
        console.log(NEXT_SUNDAY_Date);
        console.log(LAST_MONDAY_Date);
        if (err) {
          return res.status(400).send(err);
        } else {
          var finalResponse = [];
          var length = response.length;
          for (var i = 0; i < length; i++) {
            var total = 0;

            var total = 1;

            for (var j = i + 1; j < length; j++) {
              if (
                response[i]?.createdAt.getDate() ==
                  response[j]?.createdAt.getDate() &&
                response[i]?.createdAt.getMonth() ==
                  response[j]?.createdAt.getMonth() &&
                response[i]?.createdAt.getYear() ==
                  response[j]?.createdAt.getYear()
              ) {
                total = total + 1;

                delete response[j];
              }
            }
            if (response[i]) {
              finalResponse.push({
                date:
                  response[i].createdAt.getDate() +
                  "/" +
                  response[i].createdAt.getMonth() +
                  "/" +
                  response[i].createdAt.getYear(),
                total: total,
              });
            }

            delete response[i];
          }

          res.status(200).json({
            sales: finalResponse,
          });
        }
      });
    } else if (period == "customDate") {
      if (Date.parse(date)) {
        const CustomDate = new Date(date);
        var tomorrow = new Date(CustomDate);
        tomorrow.setDate(CustomDate.getDate() + 1);
        tomorrow.toLocaleDateString();
        User.find({
          createdAt: {
            $gte: CustomDate,
            $lt: tomorrow,
          },
        }).then((response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            var finalResponse = [];
            var length = response.length;
            for (var i = 0; i < length; i++) {
              var total = 1;

              for (var j = i + 1; j < length; j++) {
                if (
                  response[i]?.createdAt.getDate() ==
                    response[j]?.createdAt.getDate() &&
                  response[i]?.createdAt.getMonth() ==
                    response[j]?.createdAt.getMonth() &&
                  response[i]?.createdAt.getYear() ==
                    response[j]?.createdAt.getYear()
                ) {
                  total = total + 1;
                  delete response[j];
                }
              }
              if (response[i]) {
                finalResponse.push({
                  date:
                    response[i].createdAt.getHours() +
                    "-" +
                    (response[i].createdAt.getHours() == 24
                      ? 0
                      : response[i].createdAt.getHours() + 1),
                  total: total,
                });
              }

              delete response[i];
            }

            res.status(200).json({
              sales: finalResponse,
            });
          }
        });
      } else {
        res.status(400).send({
          message: "Invalid date",
        });
      }
    } else if (period == "startDate") {
      if (Date.parse(date)) {
        const CustomDate = new Date(date);
        var tomorrow = new Date(CustomDate);
        tomorrow.setDate(CustomDate.getDate() + 1);
        tomorrow.toLocaleDateString();
        User.find({
          createdAt: {
            $gte: CustomDate,
          },
        }).then((response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            var finalResponse = [];
            var length = response.length;
            for (var i = 0; i < length; i++) {
              var total = 1;

              for (var j = i + 1; j < length; j++) {
                if (
                  response[i]?.createdAt.getDate() ==
                    response[j]?.createdAt.getDate() &&
                  response[i]?.createdAt.getMonth() ==
                    response[j]?.createdAt.getMonth() &&
                  response[i]?.createdAt.getYear() ==
                    response[j]?.createdAt.getYear()
                ) {
                  total = total + 1;
                  delete response[j];
                }
              }
              if (response[i]) {
                finalResponse.push({
                  date: response[i].createdAt.getDate(),
                  total: total,
                });
              }

              delete response[i];
            }

            res.status(200).json({
              sales: finalResponse,
            });
          }
        });
      } else {
        res.status(400).send({
          message: "Invalid date",
        });
      }
    } else if (period == "endDate") {
      if (Date.parse(date)) {
        const CustomDate = new Date(date);
        var tomorrow = new Date(CustomDate);
        tomorrow.setDate(CustomDate.getDate() + 1);
        tomorrow.toLocaleDateString();
        User.find({
          createdAt: {
            $lt: tomorrow,
          },
        }).then((response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            var finalResponse = [];
            var length = response.length;
            for (var i = 0; i < length; i++) {
              var total = 1;

              for (var j = i + 1; j < length; j++) {
                if (
                  response[i]?.createdAt.getDate() ==
                    response[j]?.createdAt.getDate() &&
                  response[i]?.createdAt.getMonth() ==
                    response[j]?.createdAt.getMonth() &&
                  response[i]?.createdAt.getYear() ==
                    response[j]?.createdAt.getYear()
                ) {
                  total = total + 1;

                  delete response[j];
                }
              }
              if (response[i]) {
                finalResponse.push({
                  date: response[i].createdAt.getDate(),
                  total: total,
                });
              }

              delete response[i];
            }

            res.status(200).json({
              sales: finalResponse,
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

module.exports = GetUserController;
