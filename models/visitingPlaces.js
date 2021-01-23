const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

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
        type: pointSchema,
        index: '2dsphere',
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
    travellingMethods:[
        {type:String,
        enum:['Bus','Car','Train','Threewheeler','Foot']}
    ]
}, {
    timestamps: true
});

placeSchema.index({'$**':'text'});
var Places = mongoose.model('Place', placeSchema);

module.exports = Places;