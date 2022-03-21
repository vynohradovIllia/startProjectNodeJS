exports.addUser = (req, res) => {
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
exports.getUsers = (req, res) => {
    const collection = req.app.locals.collection;
    collection.find({}).toArray((err, users) => {
        if(err) return console.log(err);
        res.send(users);
    }); 
}
exports.deleteUser = (req, res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, (err, result) => {
        if(err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
}
exports.patchUser = (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const imageProfile = req.body.image;

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate(
      {_id: id}, 
        { $set: 
          {
            fname: firstName,
            lname: lastName, 
            email: email, 
            phone: phone, 
            password: password, 
            imageProfile: image
          }
        },
        {
          returnDocument: "after"}, (err, result) => {
            if(err) return console.log(err);
            const user = result.value;
            res.send(user);
          }
    );
}