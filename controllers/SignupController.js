const User = require("../models/user");
const credentials = require('../models/credential');
const bcrypt = require("bcrypt");
const saltRounds = 10;

class SignupController {
    static async Execute(req, res) {

        const {  name, email, companyname,  isVerified, role } = req.body;
        console.log(req)
    };
};