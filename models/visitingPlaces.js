const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

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
}, {
    timestamps: true
});

var Places = mongoose.model('Place', placeSchema);

const validatePlaces = (place) =>{

    const schema = Joi.object({

        'name' : Joi.string().required(),
        'description' : Joi.string().required(),
        'location' : Joi.string().required(),
        'distance' : Joi.string().required(),
        'timeToReach' : Joi.string().required(),
        'image' : Joi.array().items(Joi.string())
    });

    return schema.validate(place);
}

const validatePoint = (point) =>{

    const schema = Joi.object({

        'type' : Joi.string().required().default('Point'),
        'coordinates' : Joi.number().required()
    });

    return schema.validate(point);
}

module.exports = {Places,validatePlaces,validatePoint};