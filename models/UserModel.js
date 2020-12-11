const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema;({
    fisrtName : {
        type: String,
        required: true,
    },
    lastNmae : {
        type: String,
        required: false,

    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,

    },
    registerDate :{
        type: Date,
        default: Date.now,
    }
})

module.exports = User = mongoose.model("user", UserSchema)