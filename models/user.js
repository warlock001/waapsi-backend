const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  dialCode: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },

});

module.exports = mongoose.model("User", UserSchema);
