const Tourists = require('../models/users');
const utils = require('../utils/utils');
const TouristService = require('../services/touristService');

// **********************************************************************************
// 
//              Tourist Operations 
// 
// **********************************************************************************

const getAllTourists = (req, res, next) => {
    var query = { "role": "user" };
    var sortby = req.body.sortBy || {};
    var searchBy = req.body.similarTo || {}
    var obj = Object.assign(query, searchBy);
    Tourists.find(query).sort(sortby)
        .then((tourists) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tourists);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addTourist = async (req, res, next) => {
    const randomPassword = utils.password_generator(10);
    var tourist = {
        username: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: 'user'
    }
    try {
        const error = await TouristService.addTourist(tourist, randomPassword);
        console.log(error);
        if (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: result.message });
        } else {
            console.log('Tourist Created ', tourist);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ tourist: tourist, password: randomPassword });
        }
    } catch (error) {
        var error = new Error("Error while registering new user.");
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: error.message });
    }
}

const deleteAllTourists = (req, res, next) => {
    Tourists.remove({ "role": "user" })
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
    var touristId = req.params.touristId;
    Tourists.findById(touristId)
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