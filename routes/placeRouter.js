const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
const { checkSchema } = require('express-validator');
var authenticate = require('../middleware/authenticate');
var validationRules = require('../middleware/validation');
const placeController = require('../controllers/placeController');

const visitingPlaceRouter = express.Router();

visitingPlaceRouter.use(bodyParser.json());

// **********************************************************************************

//              Visiting Place Routes

// **********************************************************************************

visitingPlaceRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser,  placeController.getAllVisitingPlaces)
    .post(cors.corsWithOptions,  authenticate.verifyUser, authenticate.verifyAdmin,  placeController.addVisitingPlace)
    .put(cors.corsWithOptions,  (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /visitingPlaces');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, placeController.deleteAllVisitingPlaces);
visitingPlaceRouter.route('/search')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(cors.corsWithOptions,   placeController.getAllVisitingPlacesByName);

// **********************************************************************************
// 
//              Visiting Place Routes On ID
// 
// **********************************************************************************

visitingPlaceRouter.route('/:visitingPlaceId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser,  placeController.getVisitingPlaceDetailsById)
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /visitingPlaces/' + req.params.visitingPlaceId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  placeController.updateVisitingPlaceDetailsById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, placeController.deleteAVisitingPlaceById);

module.exports = visitingPlaceRouter;
