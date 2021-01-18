const Employees = require('../models/users');

const addEmployee = async (employee, password) => {
    console.log("registering");
    Employees.register(new Employees(employee),
        password, (err, employee) => {
            if (err) {
                console.log("Error while registering new user");
                return true;
            }
            else {
                employee.save((err, employee) => {
                    if (err) {
                        console.log("Error while saving new user");
                        return true;
                    }
                    return false;
                });
            }
        });
}


exports.addEmployee = addEmployee;