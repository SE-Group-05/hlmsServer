const VisitingPlaces = require('../models/visitingPlaces');

// **********************************************************************************
// 
//              Visiting Place Operations 
// 
// **********************************************************************************

const getVisitingPlaces = (findQuery, filterBy, sortBy) => {
    try {
        VisitingPlaces.find(findQuery).where(filterBy).sort(sortBy)
    } catch (error) {
        return(error);
    }
    VisitingPlaces.find(req.query)
        .then((visitingPlaces) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(visitingPlaces);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addVisitingPlace = (req, res, next) => {
    console.log(req.body);
    // VisitingPlaces.create(req.body)
    //     .then((visitingPlace) => {
    // console.log('VisitingPlace Created ', visitingPlace);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ hi: 'visitingPlace' });
    //     }, (err) => next(err))
    //     .catch((err) => next(err));
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

exports.getVisitingPlaces = getVisitingPlaces;
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