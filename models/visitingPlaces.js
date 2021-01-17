const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

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

module.exports = {Places,validatePlaces};