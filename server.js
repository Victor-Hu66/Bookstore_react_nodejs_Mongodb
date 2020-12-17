const express = require("express")
const app = express();
require("dotenv").config();
// const cors = require("cors");
const connectDB = require("./models/connectDB");
const port = process.env.PORT || 5000;
const router = require("./routes/router");


connectDB();

// app.use(cors());
app.use(express.json()); // using for sending data in req.body
app.use( "/api", router )


// production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }


 app.listen(port, () => {
    console.log(`I m listening on port ${port}`)
})

//adfdas
