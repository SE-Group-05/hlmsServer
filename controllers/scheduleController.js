const Schedules = require('../models/schedules');

// **********************************************************************************
// 
//              Schedule Operations 
// 
// **********************************************************************************

const getAllSchedules = (req, res, next) => {
    Schedules.find(req.query)
        .then((schedules) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedules:schedules });
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Failed to get data" });
        });
}

const getAllSchedulesForAUser = (req, res, next) => {
    var query = { "user": req.body.userid };
    Schedules.find(query)
        .then((schedules) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedules:schedules });
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Failed to get data" });
        });
}

const addSchedule = (req, res, next) => {
    Schedules.create(req.body)
        .then((schedule) => {
            console.log('Schedule Created ', schedule);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedule:schedule });
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Failed to add a schedule" });
        });
}

const deleteAllSchedules = (req, res, next) => {
    Schedules.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getAllSchedules = getAllSchedules;
exports.addSchedule = addSchedule;
exports.deleteAllSchedules = deleteAllSchedules;
exports.getAllSchedulesForAUser = getAllSchedulesForAUser;

// **********************************************************************************
// 
//              Schedule Operations Specified by ID
// 
// **********************************************************************************

const getScheduleDetailsById = (req, res, next) => {
    Schedules.findById(req.params.scheduleId)
        .then((schedule) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedule:schedule });
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Fetch failed" });
        });
}

const updateScheduleById = (req, res, next) => {
    Schedules.findByIdAndUpdate(req.params.scheduleId, {
        $set: req.body
    }, { new: true })
        .then((schedule) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedule:schedule });
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Update failed" });
        });
}

const deleteScheduleById = (req, res, next) => {
    Schedules.findByIdAndRemove(req.params.scheduleId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, response:resp });
        }, (err) => next(err))
        .catch((err) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: "Delete failed" });
        });
}

exports.getScheduleDetailsById = getScheduleDetailsById;
exports.updateScheduleById = updateScheduleById;
exports.deleteScheduleById = deleteScheduleById;

// **********************************************************************************
// 
//              Schedule Operations Specified by UserID
// 
// **********************************************************************************

const getScheduleDetailsByUserId = (req, res, next) => {
    Schedules.findById(req.params.scheduleId)
        .then((schedule) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(schedule);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const updateScheduleByUserId = (req, res, next) => {
    Schedules.findByIdAndUpdate(req.params.scheduleId, {
        $set: req.body
    }, { new: true })
        .then((schedule) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(schedule);
        }, (err) => next(err))
        .catch((err) => next(err));
}

const deleteScheduleByUserId = (req, res, next) => {
    Schedules.findByIdAndRemove(req.params.scheduleId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}