const Employees = require('../models/users');
const utils = require('../utils/utils');

// **********************************************************************************
// 
//              Employee Operations 
// 
// **********************************************************************************

/**
 * @description get details of the assistants
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {array} list of employees
 */
const getAllEmployees = (req, res, next) => {
    var query = { "role": "moderater" };
    Employees.find(query)
        .then((employees) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, employees: employees });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getAllEmployeesByName = (req, res, next) => {
    var query = { "role": "moderater" };
    // if (req.body.similarTo) {
    //     var searchBy = req.body.similarTo || {}
    //     query = { "role": "moderater", $text: { $search: searchBy } }
    // }
    if (req.body.similarTo) {
        var searchBy = req.body.similarTo || {}
        query = { "role": "moderater", firstname: { $regex: `${searchBy}`, $options: "i" } }
    }
    var sortby = req.body.sortBy || {};
    Employees.find(query).sort(sortby)
        .then((employees) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, employees: employees });
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
        Employees.register(new Employees(employee),
            randomPassword, (err, employee) => {
                if (err) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: false, message: err.message });
                }
                else {
                    employee.save((err, employee) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                             res.json({ success: false, message: 'Error while Saving new user.' });
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, email: employee.email, password: randomPassword });
                    });
                }
            });
    } catch (error) {
        var err = new Error("Error while registering new user.");
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: err.message });
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
exports.getAllEmployeesByName = getAllEmployeesByName;
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
            res.json({ success: true, employee: employee });
        }, (err) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'Could not find employee with given ID' });
        })
        .catch((err) => next(err));
}

const updateEmployeeDetailsById = (req, res, next) => {
    var employee = {
        username: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: 'moderater'
    }
    Employees.findByIdAndUpdate(req.params.employeeId, {
        $set: employee
    }, { new: true })
        .then((employee) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, employee: employee });
        }, (err) => next(err))
        .catch((err) => {
            var err = new Error("Error while updating.");
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: err.message });
        });
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