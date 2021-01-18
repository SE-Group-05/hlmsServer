const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
const placeController = require('../controllers/placeController');

const visitingPlaceRouter = express.Router();

visitingPlaceRouter.use(bodyParser.json());

// **********************************************************************************

//              Visiting Place Routes

// **********************************************************************************

visitingPlaceRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, placeController.getAllVisitingPlaces)
    .post(cors.corsWithOptions,placeController.addVisitingPlace)
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /visitingPlaces');
    })
    .delete(cors.corsWithOptions,placeController.deleteAllVisitingPlaces);

// **********************************************************************************
// 
//              Visiting Place Routes On ID
// 
// **********************************************************************************

visitingPlaceRouter.route('/:visitingPlaceId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, placeController.getVisitingPlaceDetailsById)
    .post(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /visitingPlaces/' + req.params.visitingPlaceId);
    })
    .put(cors.corsWithOptions,placeController.updateVisitingPlaceDetailsById)
    .delete(cors.corsWithOptions,placeController.deleteAVisitingPlaceById);

module.exports = visitingPlaceRouter;
