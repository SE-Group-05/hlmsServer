const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
const travellingMethodController = require('../controllers/travellingMethodController');

const travellingMethodRouter = express.Router();

travellingMethodRouter.use(bodyParser.json());

// **********************************************************************************
// 
//              Travelling Method Routes
// 
// **********************************************************************************

travellingMethodRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, travellingMethodController.getAllTravellingMethods)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, travellingMethodController.addTravellingMethod)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /travellingMethods');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, travellingMethodController.deleteAllTravellingMethods);

// **********************************************************************************
// 
//              Travelling Method Routes On ID
// 
// **********************************************************************************

travellingMethodRouter.route('/:travellingMethodId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, travellingMethodController.getTravellingMethodDetailsById)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /travellingMethods/' + req.params.travellingMethodId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, travellingMethodController.updateTravellingMethodDetailsById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, travellingMethodController.deleteATravellingMethodById);

module.exports = travellingMethodRouter;