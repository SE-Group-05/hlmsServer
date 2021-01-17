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
    travelingMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TravelingMethod"
    },
    fair: {
        type: Currency,
        required: true,
        min: 0
    },
    state: {
        type: String,
        default: "not-completed",
        enum: ["not-completed","canceled","completed"]
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