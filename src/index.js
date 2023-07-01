const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const question = require("./routes/question.js");

dotenv.config()
//CONNECT Database
mongoose.set("strictQuery", false);

myDbConnection()
async function myDbConnection() {
    try {
        await mongoose.connect(process.env.mongoDB_URL, { useNewUrlParser: true });
        console.log('Connected Successfully')
    } catch (error) {
        console.log('Error connecting to DB ::', error);
    }
}

app.get("/api", (req, res) => {
    res.status(200).json("Service OK!");
})

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/question", question)

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running...");
})