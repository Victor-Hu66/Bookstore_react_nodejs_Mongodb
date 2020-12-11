const { Router } = require("express");
const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
    console.log("Api page")
    res.send("Api page")
})


module.exports = router