const Schedules = require('../models/schedules');

// **********************************************************************************
// 
//              Schedule Operations 
// 
// **********************************************************************************

const getAllSchedules = (req, res, next) => {
    Schedules.find(req.query).populate("place").populate("user")
        .then((schedules) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedules:schedules });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const getAllSchedulesForAUser = (req, res, next) => {
    var query = { "user": String(req.params.userId) };
    Schedules.find(query).populate("place")
        .then((schedules) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedules:schedules });
        }, (err) => next(err))
        .catch((err) => next(err));
}

const addSchedule = (req, res, next) => {
    var schedule = {
        user: req.body.user,
        place: req.body.place,
        date: req.body.date,
        state: "new",
        travellingMethod: req.body.travellingMethod
    }
    Schedules.create(schedule)
        .then((schedule) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, schedule:schedule });
        }, (err) => next(err))
        .catch((err) => next(err));
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
        .catch((err) => next(err));
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
        .catch((err) => next(err));
}

const deleteScheduleById = (req, res, next) => {
    Schedules.findByIdAndRemove(req.params.scheduleId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, response:resp });
        }, (err) => next(err))
        .catch((err) => next(err));
}

exports.getScheduleDetailsById = getScheduleDetailsById;
exports.updateScheduleById = updateScheduleById;
exports.deleteScheduleById = deleteScheduleById;