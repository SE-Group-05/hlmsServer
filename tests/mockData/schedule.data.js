const mongoose = require('mongoose');
const {getExistingId} = require('../helpers/user_helper');

const schedule = async(id = null)=>{
    return [{
        "user": mongoose.Types.ObjectId(id),
        "place": mongoose.Types.ObjectId(),
        "date": new Date(),
        "travellingMethod": 'Bus'
    
    }];
}


module.exports = schedule;