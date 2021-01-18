const Employees = require('../models/users');
const utils = require('../utils/utils');
const EmployeeService = require('../services/EmployeeService');

// **********************************************************************************
// 
//              Employee Operations 
// 
// **********************************************************************************

const getAllEmployees = (req, res, next) => {
    var query = { "role": "moderater" };
    var sortby = req.body.sortBy || {};
    var searchBy = req.body.similarTo || {}
    var obj = Object.assign(query, searchBy);
    Employees.find(query).sort(sortby)
        .then((employees) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(employees);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addEmployee = async (req, res, next) => {
    const randomPassword = utils.password_generator(10);
    var employee = {
        username: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: 'moderater'
    }
    try {
        const error = await EmployeeService.addEmployee(employee, randomPassword);
        if (error) {
            var err = new Error("Error while registering new user.");
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: err.message });
        } else {
            console.log('Assistant Created ', employee);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ employee: employee, password: randomPassword });
        }
    } catch (error) {
        var err = new Error("Error while registering new user.");
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: err.message });
    }
}

const deleteAllEmployees = (req, res, next) => {
    Employees.remove({ "role": "moderater" })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getAllEmployees = getAllEmployees;
exports.addEmployee = addEmployee;
exports.deleteAllEmployees = deleteAllEmployees;

// **********************************************************************************
// 
//              Employee Operations Specified by ID
// 
// **********************************************************************************

const getEmployeeDetailsById = (req, res, next) => {
    Employees.findById(req.params.employeeId)
        .then((employee) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(employee);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateEmployeeDetailsById = (req, res, next) => {
    Employees.findByIdAndUpdate(req.params.employeeId, {
        $set: req.body
    }, { new: true })
        .then((employee) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(employee);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteAEmployeeById = (req, res, next) => {
    Employees.findByIdAndRemove(req.params.employeeId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getEmployeeDetailsById = getEmployeeDetailsById;
exports.updateEmployeeDetailsById = updateEmployeeDetailsById;
exports.deleteAEmployeeById = deleteAEmployeeById;