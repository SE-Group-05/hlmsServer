const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
const touristController = require('../controllers/touristController')

const touristRouter = express.Router();

touristRouter.use(bodyParser.json());

// **********************************************************************************
// 
//              Tourist Routes
// 
// **********************************************************************************

touristRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, touristController.getAllTourists)
    .post(cors.corsWithOptions,touristController.addTourist)
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /tourists');
    })
    .delete(cors.corsWithOptions,touristController.deleteAllTourists);

// **********************************************************************************
// 
//              Tourist Routes Specified by ID
// 
// **********************************************************************************

touristRouter.route('/:touristId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, touristController.getTouristDetailsById)
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /tourists/' + req.params.touristId);
    })
    .put(cors.corsWithOptions, touristController.updateTouristDetailsById)
    .delete(cors.corsWithOptions, touristController.deleteATouristById);

module.exports = touristRouter;