const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const {  validationResult } = require("express-validator");  



//! --------------------------------------------------------------------------------------------UserRegister
exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // console.log(req.body)

  // TODO1: Validate the fields---------------------------------------------------------
  const validationErr = validationResult(req);

    if (validationErr?.errors?.length > 0) {
      return res.status(401).json ( { errors : validationErr.array() } );
    }

  // TODO2: check already registered----------------------------------------------------
  const userData = await User.findOne( { email } );
  
  if (userData) {
    return res
      .status(401)
      .json ( { errors : [ {message : "user already exist!!" } ] } );
  }
  
  // TODO3: crpyt password--------------------------------------------------------------
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt)

  // TODO4: save the user to DB---------------------------------------------------------
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

//! ------------------------------------------------------------------------------------------UserLogin

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;
  
    
  // TODO1: Validate the fields---------------------------------------------------------
  const validationErr = validationResult(req);

    if (validationErr?.errors?.length > 0) {
      return res.status(401).json ( { errors : validationErr.array() } );
    }



  // TODO2: user exist?-----------------------------------------------------------------
  const userData = await User.findOne( { email } );
  
  if (!userData) {
    return res
      .status(401)
      .json ( { errors : [ {message : "user does't exist!!" } ] } );
  }

  // TODO3: password compare------------------------------------------------------------
  const isPasswordMatch = await bcrypt.compare(password, userData.password);
  
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json ( { errors : [ {message : "invalid credentials!!" } ] } );
  }

  // TODO4: authentication return JSON WEb TOKEN - JWT----------------------------------
  
  res.send("Login Completed");
};
