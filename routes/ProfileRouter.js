const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");


// base Url : /api/profile

/**
 * @route GET /api/profile
 * @desc Profile endpoint
 * @access Private
 */

 router.get("/", auth, (req,res) => {
     res.send (req.decodedUser.email); // we will change here
 })

 module.exports = router;