const express = require('express');
const bodyParser = require('body-parser');
const { checkSchema } = require('express-validator');
const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
var validationRules = require('../middleware/validation');
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
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, checkSchema(validationRules), employeeController.getAllEmployees)
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, checkSchema(validationRules), employeeController.addEmployee)
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /employees');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, checkSchema(validationRules), employeeController.deleteAllEmployees);
employeeRouter.route('/search')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(cors.corsWithOptions, authenticate.verifyUser, checkSchema(validationRules), employeeController.getAllEmployeesByName);

// **********************************************************************************
// 
//              Employee Routes Specified by ID
// 
// **********************************************************************************

employeeRouter.route('/:employeeId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, checkSchema(validationRules), employeeController.getEmployeeDetailsById)
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /employees/' + req.params.employeeId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, checkSchema(validationRules), employeeController.updateEmployeeDetailsById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, checkSchema(validationRules), employeeController.deleteAEmployeeById);

module.exports = employeeRouter;