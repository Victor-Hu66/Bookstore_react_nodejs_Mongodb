const express = require("express");
const { check } = require("express-validator");  // use this as a middleware
const router = express.Router();
const AuthController = require ("../controllers/AuthController")


// Routes for /api/auth

/**
 * @route POST /api/auth/register
 * @desc  Register endpoint
 * @access Puclic 
 */

// router.post("/register",[mid1, mid2, mid3, ... ], AuthController.authRegister)

router.post("/register", 
[   // İf there is a password in the coming request than validate it!
    check("password","Please enter a password with 6 and more chars").isLength(
        {
            min:6,
        }
    ),
    check("email", "Please enter a valid email").isEmail(),
],
AuthController.authRegister)
/**
 * @route POST /api/auth/login
 * @desc  Login endpoint
 * @access Private   
 */

router.post("/login", AuthController.authLogin)


module.exports = router