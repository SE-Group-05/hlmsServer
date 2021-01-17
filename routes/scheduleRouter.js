const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
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
    .get(cors.cors, scheduleController.getAllSchedules)
    .post(cors.corsWithOptions, scheduleController.addSchedule)
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /schedules');
    })
    .delete(cors.corsWithOptions, scheduleController.deleteAllSchedules);

// **********************************************************************************
// 
//              Schedule Routes On ID
// 
// **********************************************************************************

scheduleRouter.route('/:scheduleId')
    .options(cors.corsWithOptions,  (req, res) => { res.sendStatus(200); })
    .get(cors.cors, scheduleController.getScheduleDetailsById)
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /schedules/' + req.params.scheduleId);
    })
    .put(cors.corsWithOptions, scheduleController.updateScheduleById)
    .delete(cors.corsWithOptions, scheduleController.deleteScheduleById);

module.exports = scheduleRouter;