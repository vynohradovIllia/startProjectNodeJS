const Joi = require("Joi");

const addUser = (req, res) => {
    if(!req.body) {
        return res.sendStatus(400);
    }

    const fName = req.body.firstName;
    const lName = req.body.lastName;
    let user = {firstName: fName, lastName: lName};

    userSchema = Joi.object({
        fName: Joi.string().alphanum().min(2).max(20).required(),
        lName: Joi.string().alphanum().min(2).max(20).required()
    });

    const result = userSchema.validate(req.body);
    console.log(result);

    const collection = req.app.locals.collection;

    collection.insertOne(user, (err, result) => {
        if(err) return console.log(err);
        console.log("Added");
        res.send(user);
    });
    
}

module.exports = {
    addUser
}