const Schedule = require('../../models/schedules');
const mockSchedule = require('../mockData/schedule.data');
const mongoose = require('mongoose');


const addSchedulesToDb = async (id) => {
    const schedules= await mockSchedule(id);
    const scheduleObjects = schedules
        .map(schedule => new Schedule(schedule));
    const promiseArray = scheduleObjects.map(schedule => schedule.save());
    await Promise.all(promiseArray);
}

const getExistingId = async () => {
    const newSchedule = {
        "user": mongoose.Types.ObjectId(),
        "place": mongoose.Types.ObjectId(),
        "date": Date(),
        "travellingMethod": 'Car'
    
    };
    const schedule = new Schedule(newSchedule);
    await schedule.save();

    return schedule._id.toString();
}

const getNonExistingId = async () => {
    const newSchedule = {
        "user": mongoose.Types.ObjectId(),
        "place": mongoose.Types.ObjectId(),
        "date": Date(),
        "travellingMethod": 'Car'
    
    };
    const schedule = new Schedule(newSchedule);
    await schedule.save();
    await schedule.remove();

    return schedule._id.toString();
}

const schedulesInDb = async () => {
    const places = await Note.find({});
    return places;
}

module.exports = {
     addSchedulesToDb, getExistingId, getNonExistingId,schedulesInDb
}