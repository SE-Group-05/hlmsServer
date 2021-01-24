const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
const { checkSchema } = require('express-validator');
var authenticate = require('../middleware/authenticate');
var validationRules = require('../middleware/validation');
const scheduleController = require('../controllers/scheduleController')

const scheduleRouter = express.Router();

scheduleRouter.use(bodyParser.json());
// **********************************************************************************
// 
//              Schedule Routes
// 
// **********************************************************************************

scheduleRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, scheduleController.getAllSchedules)
    .post(cors.corsWithOptions, authenticate.verifyUser, checkSchema(validationRules), scheduleController.addSchedule)
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /schedules');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, scheduleController.deleteAllSchedules);

// **********************************************************************************
// 
//              Schedule Routes On ID
// 
// **********************************************************************************

scheduleRouter.route('/:scheduleId')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, scheduleController.getScheduleDetailsById)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /schedules/' + req.params.scheduleId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, checkSchema(validationRules), scheduleController.updateScheduleById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, scheduleController.deleteScheduleById);

module.exports = scheduleRouter;