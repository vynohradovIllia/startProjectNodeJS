const express = require("express");
const mongoClient = require("mongodb").MongoClient;

const app = express();
const mongoClient = new MongoClient("mongodb://localhost:27017/");

mongoClient.connect((err, client) => {
    if(err) {
        return console.log(err);
    }
    client.close();
})

app.get("/api/main", (req, res) => {
    res.send("test get");
});

app.post("/api/main", (req, res) => {
    res.send("test post");
});

app.patch("/api/main", (req, res) => {
    res.send("test patch");
});

app.delete("/api/main/:id", (req, res) => {
    res.send("test delete");
});

console.log("Server is listening on port 9000");
app.listen(9000);