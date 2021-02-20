const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
const { checkSchema } = require('express-validator');
var authenticate = require('../middleware/authenticate');
var validationRules = require('../middleware/validation');
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
    .get(cors.cors,  authenticate.verifyUser,   touristController.getAllTourists)
    .post(cors.corsWithOptions,  authenticate.verifyUser, authenticate.verifyModerater, touristController.addTourist)

    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /tourists');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  touristController.deleteAllTourists);

touristRouter.route('/search')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(cors.corsWithOptions, authenticate.verifyUser,  touristController.getAllTouristsByName);


// **********************************************************************************
// 
//              Tourist Routes Specified by ID
// 
// **********************************************************************************

touristRouter.route('/:touristId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

    .get(cors.cors, authenticate.verifyUser,   touristController.getTouristDetailsById)

    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /tourists/' + req.params.touristId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyModerater,  touristController.updateTouristDetailsById)
    .delete(cors.corsWithOptions,  authenticate.verifyUser, authenticate.verifyModerater, touristController.deleteATouristById);


module.exports = touristRouter;