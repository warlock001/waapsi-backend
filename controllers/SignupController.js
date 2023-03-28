const User = require("../models/user");
const Credentials = require("../models/credential");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const otpGenerator = require("otp-generator");

class SignupController {
  static async Execute(req, res) {
    if (
      req.body?.name == undefined ||
      req.body?.email == undefined ||
      req.body?.companyName == undefined ||
      req.body?.dialCode == undefined ||
      req.body?.mobile == undefined ||
      req.body?.role == undefined
    ) {
      res.status(400).json({
        message: `Invalid Request`,
      });
    } else {
      const { name, email, companyName, dialCode, mobile, role } = req.body;

      const user = new User({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        companyName: companyName.trim(),
        mobile: mobile.trim(),
        isVerified: false,
        dialCode: dialCode,
        role: role.trim(),
      });

      //fetching existing users
      const existingUser = await User.find({
        email: email,
      });
      //checking if email already exist
      if (existingUser.length > 0) {
        //found
        res.status(400).json({
          message: `Email Address is already registered`,
        });
      } else {
        //not found

        user.save().then(async (response, err) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            //create a dummy password which can be reset afterwards
            var password = await otpGenerator.generate(4, {
              upperCaseAlphabets: false,
              digits: true,
              specialChars: false,
              lowerCaseAlphabets: false,
            });

            console.log(password);

            //creating hash of dummy password
            bcrypt.hash(password, saltRounds).then(async function (hash) {
              // Store hash in your password DB.
              const credential = new Credentials({
                user: response._id,
                email: response.email.trim(),
                password: hash,
                role: "client",
                OTP: password,
              });

              credential.save().then(async (response, err) => {
                if (err) {
                  return res.status(400).send(err);
                } else {
                  res.status(200).json({
                    message: `user added sucessfully`,
                  });
                }
              });
            });
          }
        });
      }
    }
  }
}

module.exports = SignupController;
