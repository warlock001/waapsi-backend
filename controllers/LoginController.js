const Credential = require("../models/credential");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
class LoginController {
  static async Execute(req, res) {
    console.log(req.body);
    const { email, password, facebookAuthToken } = req.body;

    if (email && password) {
      const existingUser = await Credential.findOne({
        email: email.toLowerCase(),
      });
      console.log(existingUser);
      if (existingUser) {
        const user = await User.find({ _id: existingUser.user });

        console.log(user);
        await bcrypt
          .compare(password, existingUser.password)
          .then(function (result) {
            if (result == true) {
              const token = jwt.sign(
                JSON.stringify({
                  _id: existingUser._id,
                  role: existingUser.role,
                }),
                process.env.ACCESS_TOKEN_JWT
              );
              res.setHeader("x-auth-token", token);
              console.log(user[0].isVerified);
              res.status(200).send({
                message: "Login Successfull",
                company: user[0].companyName,
                email: existingUser.email,
                _id: user[0]._id,
                token: token,
                isVerified: user[0].isVerified,
              });
            } else {
              res.status(400).send({
                message: "Invaild credentials",
              });
            }
          });
      } else {
        res.status(403).send({
          message: "No user found",
        });
      }
    } else if (email != undefined && facebookAuthToken != undefined) {


      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      });
      console.log(existingUser);
      if (existingUser) {

        axios.get(`https://graph.facebook.com/me?access_token=${facebookAuthToken}`).then((response) => {
          const token = jwt.sign(
            JSON.stringify({
              _id: existingUser._id,
              role: existingUser.role,
            }),
            process.env.ACCESS_TOKEN_JWT
          );
          res.setHeader("x-auth-token", token);
          res.status(200).send({
            message: "Login Successfull",
            email: existingUser.email,
            _id: existingUser._id,
            token: token,
            isVerified: existingUser.isVerified,
          });
        }).catch((err) => {
          console.log(err)
          res.status(400).send({
            message: "Invalid token",
          });
        })

      } else {
        axios.get(`https://graph.facebook.com/me?access_token=${facebookAuthToken}`).then((result) => {

          const user = new User({
            name: result.data.name,
            email: email.trim().toLowerCase(),
            isVerified: true,
            role: 'client',
          });

          user.save().then((response, err) => {

            const token = jwt.sign(
              JSON.stringify({
                _id: response._id,
                role: 'client',
              }),
              process.env.ACCESS_TOKEN_JWT
            );

            res.setHeader("x-auth-token", token);

            res.status(200).send({
              message: "Login Successfull",
              email: response.email,
              _id: response._id,
              token: token,
              isVerified: true,
            });

          }).catch((err) => {
            return res.status(400).send(err);
          })

        }).catch((err) => {
          res.status(400).send({
            message: "Invalid token",
          });
        })
      }


    } else {
      res.status(400).send({
        message: "Invalid request",
      });
    }
  }
}

module.exports = LoginController;
