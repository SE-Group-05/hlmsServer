const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resu
const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    timeToReach: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
}, {
    timestamps: true
});

var Places = mongoose.model('Place', placeSchema);

module.exports = Places;