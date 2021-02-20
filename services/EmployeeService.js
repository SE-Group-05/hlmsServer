const Employees = require('../models/users');

const addEmployee = async (employee, password) => {
    Employees.register(new Employees(employee),
        password, (err, employee) => {
            if (err) {
                return true;
            }
            else {
                employee.save((err, employee) => {
                    if (err) {
                        return true;
                    }
                    return false;
                });
            }
        });
}


exports.addEmployee = addEmployee;