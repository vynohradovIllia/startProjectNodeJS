const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const Emitter = require("events");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

dotenv.config();

// const emitter = new Emitter();
const app = express();
const userRouter = require("./routes/users.js");

const { logger } = require('./middlewares');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// emitter.on()

app.use(logger)

app.use("/users", userRouter);

app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

// app.use((req, res, next) => {
//     console.log(req.method, req.body);
//     next();
// });

const mongoClient = new MongoClient(process.env.MONGO_STRING);

let dbClient;

mongoClient.connect((err, client) => {
    if(err) return console.log(err);    
    dbClient = client;
    app.locals.collection = client.db("projectDB").collection("users");
    app.listen(9000, () => {
        console.log("Server is waiting connection...");
    });
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
})
