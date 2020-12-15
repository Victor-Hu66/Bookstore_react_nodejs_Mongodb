const User = require("../models/UserModel");

exports.getProfileInfo = async (req, res) => {
    try {
        const user = await User.findById(req.decodedUser._id).select("-password");
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
};


exports.updateProfileInfo = async (req, res) => {
    // TODO: update profile info
    res.send("profile updated")
};