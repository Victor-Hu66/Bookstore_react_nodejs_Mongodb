const express = require("express");
const router = express.Router();


// base Url : /api/profile

/**
 * @route GET /api/profile
 * @desc Profile endpoint
 * @access Private
 */

 router.get("/", (req,res) => {
     res.send ("Private Profile Page")
 })

 module.exports = router;