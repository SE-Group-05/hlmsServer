const VisitingPlaces = require('../models/visitingPlaces');

// **********************************************************************************
// 
//              Visiting Place Operations 
// 
// **********************************************************************************

const getAllVisitingPlaces = (req, res, next) => {
    VisitingPlaces.find(req.query)
        .then((visitingPlaces) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(visitingPlaces);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addVisitingPlace = (req, res, next) => {
    var imagesArray = [];
    // files = req.files;
    // files.forEach(file => {
    //     imagesArray.push(file.filename);
    // });
    var place =
    {
        name: req.body.name,
        description: req.body.description,
        location: {
            coordinates: req.body.location.coordinates
        },
        distance: req.body.distance,
        timeToReach: req.body.timeToReach,
        images: imagesArray
    }
    VisitingPlaces.create(place)
        .then((visitingPlace) => {
            console.log('VisitingPlace Created ', visitingPlace);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(visitingPlace);
        }, (err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: "Duplicate Key" });
        })
        .catch((err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: "Duplicate Key" });
        });
}

const deleteAllVisitingPlaces = (req, res, next) => {
    VisitingPlaces.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getAllVisitingPlaces = getAllVisitingPlaces;
exports.addVisitingPlace = addVisitingPlace;
exports.deleteAllVisitingPlaces = deleteAllVisitingPlaces;

// **********************************************************************************
// 
//              Visiting Place Operations Specified by ID
// 
// **********************************************************************************

const getVisitingPlaceDetailsById = (req, res, next) => {
    VisitingPlaces.findById(req.params.visitingPlaceId)
        .then((visitingPlace) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(visitingPlace);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateVisitingPlaceDetailsById = (req, res, next) => {
    VisitingPlaces.findByIdAndUpdate(req.params.visitingPlaceId, {
        $set: req.body
    }, { new: true })
        .then((visitingPlace) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(visitingPlace);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteAVisitingPlaceById = (req, res, next) => {
    VisitingPlaces.findByIdAndRemove(req.params.visitingPlaceId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getVisitingPlaceDetailsById = getVisitingPlaceDetailsById;
exports.updateVisitingPlaceDetailsById = updateVisitingPlaceDetailsById;
exports.deleteAVisitingPlaceById = deleteAVisitingPlaceById;