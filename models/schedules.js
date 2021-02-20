const mongoose = require('mongoose');
const Joi = require('joi');
const { schema } = require('./visitingPlaces');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const scheduleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    },
    date: {
        type: Date,
        required: true
    },
    fair: {
        type: Currency,
        min: 0
    },
    state: {
        type: String,
        default: "new",
        enum: ["new","not-completed", "canceled", "completed"]
    },
    travellingMethod: {
        type: String,
        required: true,
        enum: ['Bus', 'Car', 'Train', 'Threewheeler', 'Foot']
    }
}, {
    timestamps: true
});

var Schedules = mongoose.model('Schedule', scheduleSchema);

const validateSchedule = (schedule)=>{
    const schema = Joi.object({
        'fair' : Joi.number().integer().required().min(0),
        'date' : Joi.date()
    });

    return schema.validate(schedule);
}
module.exports ={Schedules,validateSchedule};