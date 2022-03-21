const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const express = require("express");
const Joi = require("joi");
const multer = require("multer");

var bodyParser = require('body-parser')

const app = express();
const userRouter = require("./routes/users.js");
const jsonParser = express.json();

const { logger } = require('./middlewares');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(logger)
app.user(wiillDONotUnderstand(123123123))

app.use("/users", userRouter);

app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));

// app.post("/upload", (req, res) => {
//     let filedata = req.file;
//     if(!filedata) {
//         res.send("Error");
//     } else {
//         res.send("Upload complete");
//     }
// });

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

// app.use((req, res, next) => {
//     console.log(req.method, req.body);
//     next();
// });

// add password to .env
const mongoClient = new MongoClient("mongodb+srv://vynohradov:353DyNj8x9xXNCM@cluster0.mglv0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

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
