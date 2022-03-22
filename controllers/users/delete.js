const objectId = require("mongodb").ObjectId;

const deleteUser = (req, res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, (err, result) => {
        if(err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
}

module.exports = {
    deleteUser
}