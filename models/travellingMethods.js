const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const travellingMethodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fair: {
        type: Currency,
        required: true,
        min: 0
    },
    image: {
        type: String,
    },
}, {
    timestamps: true
});

var TravellingMethods = mongoose.model('TravellingMethod', travellingMethodSchema);

module.exports = TravellingMethods;