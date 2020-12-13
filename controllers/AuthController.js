const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body)

  // TODO1: Validate the fields
  // TODO2: check already registered
  const userData = await User.findOne( { email } );
  
  if (userData) {
    return res
      .status(401)
      .json ( { errors : [ {message : "user already exist!!" } ] } );
  }
  
  // TODO3: crpyt password
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt)

  // TODO4: save the user to DB
  const user = new User({
    firstName,
    lastName,
    email,
    password : newPassword, //crypted password
  });

  await user.save();

  //TODO: Error handling for saving
  res.send("Register Completed.");
};

exports.authLogin = (req, res) => {
  // TODO: Auth.
  // TODO: Login func.
  res.send("Login Completed");
};
