const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const {  validationResult } = require("express-validator");  
var jwt = require("jsonwebtoken");
// const checkFunction = require('../helpers/checkFunction');


//! --------------------------------------------------------------------------------------------UserRegister
exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // console.log(req.body)

  // TODO1: Validate the fields---------------------------------------------------------
  const validationErr = validationResult(req);

    if (validationErr?.errors?.length > 0) {
      return res.status(401).json ( { errors : validationErr.array() } );
    }
    // checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());

  // TODO2: check already registered----------------------------------------------------
  const userData = await User.findOne( { email } );
  
  if (userData) {
    return res
      .status(401)
      .json ( { errors : [ {message : "user already exist!!" } ] } );
  }
  // checkFunction(res, userData, "User already exists!!");
  
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
    // checkFunction(res, validationErr?.errors?.length > 0, validationErr.array());



  // TODO2: user exist?-----------------------------------------------------------------
  const userData = await User.findOne( { email } );
  
  if (!userData) {
    return res
      .status(401)
      .json ( { errors : [ {message : "user does't exist!!" } ] } );
  }
  // checkFunction(res, !userData, "User doesn't exists!!");

  // TODO3: password compare------------------------------------------------------------
  const isPasswordMatch = await bcrypt.compare(password, userData.password);
  
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json ( { errors : [ {message : "invalid credentials!!" } ] } );
  }
  // checkFunction(res, !isPasswordMatch, "Invalid credentials");

  // TODO4: authentication return JSON WEb TOKEN - JWT----------------------------------
  jwt.sign({userData}, process.env.JWT_SECRET_KEY, {expiresIn: 3600}, (err, token) => {
    if (err) {
      return res
        .status(401)
        .json ( { errors : [ {message : "unknown error!" } ] } );
    }
    // checkFunction(res, err, "Unknown Error");
    res.send(token)
  });




  // res.send("Login Completed");
};
