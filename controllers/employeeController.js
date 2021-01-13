const Employees = require('../models/users');

// **********************************************************************************
// 
//              Employee Operations 
// 
// **********************************************************************************

const getAllEmployees = (req, res, next) => {
    Employees.find(req.query)
        .then((employees) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(employees);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addEmployee = (req, res, next) => {
    Employees.create(req.body)
        .then((employee) => {
            console.log('Employee Created ', employee);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(employee);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteAllEmployees = (req, res, next) => {
    Employees.remove({})
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