const getUsers = (req, res) => {
  const collection = req.app.locals.collection;
    collection.find({}).toArray((err, users) => {
        if(err) return console.log(err);
        res.send(users);
    }); 
}

module.exports = {
  getUsers
}