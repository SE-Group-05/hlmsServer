const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
const employeeController = require('../controllers/employeeController');

const employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

// **********************************************************************************
// 
//              Employee Routes
// 
// **********************************************************************************

employeeRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, employeeController.getAllEmployees)
    .post(cors.corsWithOptions, employeeController.addEmployee)
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /employees');
    })
    .delete(cors.corsWithOptions, employeeController.deleteAllEmployees);

// **********************************************************************************
// 
//              Employee Routes Specified by ID
// 
// **********************************************************************************

employeeRouter.route('/:employeeId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, employeeController.getEmployeeDetailsById)
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /employees/' + req.params.employeeId);
    })
    .put(cors.corsWithOptions, employeeController.updateEmployeeDetailsById)
    .delete(cors.corsWithOptions, employeeController.deleteAEmployeeById);

module.exports = employeeRouter;