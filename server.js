const express = require("express")
require("dotenv").config();
const connectDB = require("./models/connectDB");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // using for sending data in req.body

const router = require("./routes/router");

connectDB();

app.use( "/api", router )


app.listen(port, () => {
    console.log(`I m listening on port ${port}`)
})

//adfdas
