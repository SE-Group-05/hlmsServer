const VisitingPlaces = require('../models/visitingPlaces');

// **********************************************************************************
// 
//              Visiting Place Operations 
// 
// **********************************************************************************

const getAllVisitingPlaces = (req, res, next) => {
    var query = {};
    VisitingPlaces.find(query, 'name description distance location timeToReach image travellingMethods')
        .then((visitingPlaces) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, visitingPlaces: visitingPlaces });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getAllVisitingPlacesByName = (req, res, next) => {
    var query = {};
    if (req.body.similarTo) {
        query = { name: { $regex: `${req.body.similarTo}`, $options: "i" } }
    }
    VisitingPlaces.find(query, 'name description distance location timeToReach image travellingMethods')
        .then((visitingPlaces) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, visitingPlaces: visitingPlaces });
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
        images: imagesArray,
        travellingMethods: req.body.methods
    }
    VisitingPlaces.create(place)
        .then((visitingPlace) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, visitingPlace: visitingPlace });
        }, (err) => {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            const msg = err.driver ? "Duplicate Key" : err._message;
            res.json({ success: false, message: msg });
        })
        .catch((err) => next(err));
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
exports.getAllVisitingPlacesByName = getAllVisitingPlacesByName;
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
            res.json({ success: true, visitingPlace: visitingPlace });
        }, (err) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Could not find the place" });
        })
        .catch((err) => next(err));
}

const updateVisitingPlaceDetailsById = (req, res, next) => {
    VisitingPlaces.findByIdAndUpdate(req.params.visitingPlaceId, {
        $set: req.body
    }, { new: true })
        .then((visitingPlace) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, visitingPlace: visitingPlace });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteAVisitingPlaceById = (req, res, next) => {
    VisitingPlaces.findByIdAndRemove(req.params.visitingPlaceId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, response: resp });
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getVisitingPlaceDetailsById = getVisitingPlaceDetailsById;
exports.updateVisitingPlaceDetailsById = updateVisitingPlaceDetailsById;
exports.deleteAVisitingPlaceById = deleteAVisitingPlaceById;