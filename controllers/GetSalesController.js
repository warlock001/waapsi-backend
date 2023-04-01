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
    console.log(d)
    const thisMonth = d.getMonth() + 1;
    var LAST_MONDAY = getLastMonday(d);
    var LAST_MONDAY_Date = new Date(LAST_MONDAY);
    var NEXT_SUNDAY_Date = new Date(LAST_MONDAY_Date)
    var NEXT_SUNDAY = NEXT_SUNDAY_Date.setDate(NEXT_SUNDAY_Date.getDate() + 6);

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
      Order.find({
        createdAt: {
          $gte: LAST_MONDAY_Date,
          $lt: NEXT_SUNDAY_Date,
        },
      }).then((response, err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          console.log(response)
          var finalResponse = [];
          var length = response.length
          for (var i = 0; i < length; i++) {
            var total = 0

            var total = response[i]?.total;

            for (var j = i + 1; j < length; j++) {
              console.log(response[i]?.createdAt.getDate())
              if (response[i]?.createdAt.getDate() == response[j]?.createdAt.getDate()) {

                if (response[j]?.total) {

                  total = total + response[j].total
                }
                console.log(total)
                delete response[j]
                console.log(response)

              }

            }
            if (response[i]) {
              finalResponse.push({ date: response[i].createdAt, total: total });
            }

            delete response[i]
          }


          res.status(200).json({
            services: finalResponse,
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
            var finalResponse = [];
            var length = response.length
            for (var i = 0; i < length; i++) {
              var total = 0

              var total = response[i]?.total;

              for (var j = i + 1; j < length; j++) {
                console.log(response[i]?.createdAt.getHours())
                if (response[i]?.createdAt.getHours() == response[j]?.createdAt.getHours()) {

                  if (response[j]?.total) {

                    total = total + response[j].total
                  }
                  delete response[j]


                }

              }
              if (response[i]) {
                finalResponse.push({ time: response[i].createdAt.getHours(), total: total });
              }

              delete response[i]
            }


            res.status(200).json({
              services: finalResponse,
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
            console.log(response)
            var finalResponse = [];
            var length = response.length
            for (var i = 0; i < length; i++) {
              var total = 0

              var total = response[i]?.total;

              for (var j = i + 1; j < length; j++) {
                console.log(response[i]?.createdAt.getDate())
                if (response[i]?.createdAt.getDate() == response[j]?.createdAt.getDate()) {

                  if (response[j]?.total) {

                    total = total + response[j].total
                  }
                  console.log(total)
                  delete response[j]
                  console.log(response)

                }

              }
              if (response[i]) {
                finalResponse.push({ date: response[i].createdAt, total: total });
              }

              delete response[i]
            }


            res.status(200).json({
              services: finalResponse,
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
            console.log(response)
            var finalResponse = [];
            var length = response.length
            for (var i = 0; i < length; i++) {
              var total = 0

              var total = response[i]?.total;

              for (var j = i + 1; j < length; j++) {
                console.log(response[i]?.createdAt.getDate())
                if (response[i]?.createdAt.getDate() == response[j]?.createdAt.getDate()) {

                  if (response[j]?.total) {

                    total = total + response[j].total
                  }
                  console.log(total)
                  delete response[j]
                  console.log(response)

                }

              }
              if (response[i]) {
                finalResponse.push({ date: response[i].createdAt, total: total });
              }

              delete response[i]
            }


            res.status(200).json({
              services: finalResponse,
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
