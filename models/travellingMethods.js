const mongoose = require('mongoose');
const Joi = require('joi');
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

const validateTravelMethod = (method) =>{
    const shema = Joi.object({
        'name' : Joi.string().required(),
        'fair' : Joi.number().integer().required().min(0),
        'image' : Joi.string()
    });

    return shema.validate(method);
}

module.exports = {TravellingMethods,validateTravelMethod};