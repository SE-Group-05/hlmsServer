const TravellingMethods = require('../models/travellingMethods');

// **********************************************************************************
// 
//              Visiting Place Operations 
// 
// **********************************************************************************

const getAllTravellingMethods = (req, res, next) => {
    TravellingMethods.find(req.query)
        .then((travellingMethods) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(travellingMethods);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addTravellingMethod = (req, res, next) => {
    TravellingMethods.create(req.body)
        .then((travellingMethod) => {
            console.log('TravellingMethod Created ', travellingMethod);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(travellingMethod);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteAllTravellingMethods = (req, res, next) => {
    TravellingMethods.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getAllTravellingMethods = getAllTravellingMethods;
exports.addTravellingMethod = addTravellingMethod;
exports.deleteAllTravellingMethods = deleteAllTravellingMethods;

// **********************************************************************************
// 
//              Visiting Place Operations Specified by ID
// 
// **********************************************************************************

const getTravellingMethodDetailsById = (req, res, next) => {
    TravellingMethods.findById(req.params.travellingMethodId)
        .then((travellingMethod) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(travellingMethod);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateTravellingMethodDetailsById = (req, res, next) => {
    TravellingMethods.findByIdAndUpdate(req.params.travellingMethodId, {
        $set: req.body
    }, { new: true })
        .then((travellingMethod) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(travellingMethod);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteATravellingMethodById = (req, res, next) => {
    TravellingMethods.findByIdAndRemove(req.params.travellingMethodId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getTravellingMethodDetailsById = getTravellingMethodDetailsById;
exports.updateTravellingMethodDetailsById = updateTravellingMethodDetailsById;
exports.deleteATravellingMethodById = deleteATravellingMethodById;