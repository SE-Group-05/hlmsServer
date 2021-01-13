const Tourists = require('../models/users');

// **********************************************************************************
// 
//              Tourist Operations 
// 
// **********************************************************************************

const getAllTourists = (req, res, next) => {
    Tourists.find(req.query)
        .then((tourists) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tourists);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addTourist = (req, res, next) => {
    Tourists.create(req.body)
        .then((tourist) => {
            console.log('Tourist Created ', tourist);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tourist);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteAllTourists = (req, res, next) => {
    Tourists.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getAllTourists = getAllTourists;
exports.addTourist = addTourist;
exports.deleteAllTourists = deleteAllTourists;

// **********************************************************************************
// 
//              Tourist Operations Specified by ID
// 
// **********************************************************************************

const getTouristDetailsById = (req, res, next) => {
    Tourists.findById(req.params.touristId)
        .then((tourist) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tourist);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateTouristDetailsById = (req, res, next) => {
    Tourists.findByIdAndUpdate(req.params.touristId, {
        $set: req.body
    }, { new: true })
        .then((tourist) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tourist);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteATouristById = (req, res, next) => {
    Tourists.findByIdAndRemove(req.params.touristId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getTouristDetailsById = getTouristDetailsById;
exports.updateTouristDetailsById = updateTouristDetailsById;
exports.deleteATouristById = deleteATouristById;