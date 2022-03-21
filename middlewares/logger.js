const logger = (req, res, next) => {
    console.log(req.method, req.body);
    next();
}

module.exports = {
    logger
}

// const wiillDONotUnderstand = (value) => (req, res, next) => {
//  if joi is invalid
//  return res.status(400).send({message: 'parameters are invalid'})
// }