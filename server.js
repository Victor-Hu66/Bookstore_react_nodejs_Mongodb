const express = require("express")
require("dotenv").config();
const connectDB = require("./models/connectDB");
const app = express();

app.use(express.json()); // using for sending data in req.body

const router = require("./routes/router");

connectDB();

app.use( "/api", router )


app.listen(process.env.PORT, () => {
    console.log(`I m listening on port ${process.env.PORT}`)
})

