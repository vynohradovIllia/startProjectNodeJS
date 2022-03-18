const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const Joi = require("joi");

const app = express();
const jsonParser = express.json();

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

app.use((req, res, next) => {
    console.log(req.method, req.body);
    next();
});

try {
    app.get("/api/users", (req, res) => {
        const collection = req.app.locals.collection;
        collection.find({}).toArray((err, users) => {
            if(err) return console.log(err);
            res.send(users);
    });
    });
} catch (error) {
    console.log(error);
}


app.post("/api/users", jsonParser, (req, res) => {
    if(!req.body) {
        return res.sendStatus(400);
    }

    const fName = req.body.firstName;
    const lName = req.body.lastName;
    let user = {firstName: fName, lastName: lName};

    userSchema = Joi.object().keys({
        fName: Joi.string().alphanum().min(2).max(20).required(),
        lName: Joi.string().alphanum().min(2).max(20).required()
    });

    const { error, value } = userSchema.validate(req.body);
    if(error) {
        return console.log(error);
    } else {
        const collection = req.app.locals.collection;

        collection.insertOne(user, (err, result) => {
            if(err) return console.log(err);
            res.send(user);
        });
    }

    // const fName = req.body.firstName;
    // const lName = req.body.lastName;

    // const user = {firstName: fName, lastName: lName}

    // const user = Joi.object().keys({
    //     firstName, lastName: Joi.string().alphanum().min(2).max(20).required()
    //     // email: Joi.string().email().required(),
    //     // phone: Joi.string().min(9).max(12).required(),
    //     // password: Joi.string().pattern(new ReqExp)
    // });
    
    // user.validate(req.body, user)

});

app.delete("/api/users/:id", (req, res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, (err, result) => {
        if(err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
});

// app.patch("/api/users", jsonParser, (req, res) => {
//     if(!req.body) return res.sendStatus(400);
//     const id = new objectId(req.body.id);

//     const firstName = req.body.fname;
//     const lastName = req.body.lname;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const password = req.body.password;
//     const imageProfile = req.body.image;

//     const collection = req.app.locals.collection;
//     collection.findOneAndUpdate({_id: id}, { $set: {fname: firstName,
//                                                     lname: lastName, 
//                                                     email: email, 
//                                                     phone: phone, 
//                                                     password: password, 
//                                                     imageProfile: image}},
//         {returnDocument: "after"}, (err, result) => {
//             if(err) return console.log(err);
//             const user = result.value;
//             res.send(user);
//         });
// });

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
})
