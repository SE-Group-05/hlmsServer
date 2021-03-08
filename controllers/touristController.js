const Tourists = require('../models/users');
const utils = require('../utils/utils');

// **********************************************************************************
// 
//              Tourist Operations 
// 
// **********************************************************************************

const getAllTourists = (req, res, next) => {
    var query = { "role": "user" };
    // var obj = Object.assign(query, { $text: { $search: searchBy } });
     Tourists.find(query)
        .then((tourists) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, tourists: tourists });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getAllTouristsByName = (req, res, next) => {
    var query = { "role": "user" };
    if (req.body.similarTo) {
        var searchBy = req.body.similarTo || {}
        query = { "role": "user", $text: { $search: searchBy } }
    }

    var sortby = req.body.sortBy || {};
    Tourists.find(query).sort(sortby)
        .then((tourists) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, tourists: tourists });
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
        mobile: req.body.mobile,
        role: 'user'
    }
    try {
        Tourists.register(new Tourists(tourist),
            randomPassword, (err, tourist) => {
                if (err) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: err.message });
                }
                else {
                    tourist.save((err, tourist) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                             res.json({ success: false, message: 'Error while Saving new user.' });
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, email: tourist.email, password: randomPassword });
                    });
                }
            });
    } catch (error) {
       next(err);
    }
}

const deleteAllTourists = (req, res, next) => {
    Tourists.remove({ "role": "user" })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, response: resp });
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getAllTourists = getAllTourists;
exports.getAllTouristsByName = getAllTouristsByName;
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
            res.json({ success: true, tourist: tourist });
        }, (err) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'Could not find tourist with given ID' });
        })
        .catch((err) => next(err)); 
}

const updateTouristDetailsById = (req, res, next) => {
    
    Tourists.findByIdAndUpdate(req.params.touristId, {
        $set: req.body
    }, { new: true })
        .then((tourist) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, tourist: tourist });
        }, (err) =>  {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'Could not find tourist with given ID' });
        })
        .catch((err) => next(err));
}

const deleteATouristById = (req, res, next) => {
    Tourists.findByIdAndRemove(req.params.touristId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, response: resp });
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getTouristDetailsById = getTouristDetailsById;
exports.updateTouristDetailsById = updateTouristDetailsById;
exports.deleteATouristById = deleteATouristById;


