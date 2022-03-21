const { request } = require("express");

const addUser = (req, res) => {
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

    // рассинхорн того, что валидирую
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
}



module.exports = {
    addUser
}