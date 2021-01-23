const mongoose = require('mongoose');
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
        required: true,
        min: 0
    },
    state: {
        type: String,
        default: "new",
        enum: ["new","not-completed", "canceled", "completed"]
    },
    travellingMethod: {
        type: String,
        enum: ['Bus', 'Car', 'Train', 'Threewheeler', 'Foot']
    }
}, {
    timestamps: true
});

var Schedules = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedules;