const User = require('../../models/users');
const mockUser = require('../mockData/tourists.data');

const touristsData = mockUser;

const addToursit = async() => {
    const toursit = touristsData
        .map(user => new User(user));
        console.log(toursit);
    const promises = toursit.map(user => user.save());
    await Promise.all(promises);
}

const getExistingId = async () => {
    const newtourist = {
        "firstname": "Sanath",
        "lastname": "Jayasooriya",
        "email":"sanathjaya@gmail.com"
    };
    const user = new User(newtourist);
    await user.save();

    return user._id.toString();
}

const getNonExistingId = async () => {
    const newtourist = {
        "firstname": "test user",
        "lastname": "user surname",
        "email":"user@gmail.com"
    };
    const user = new User(newtourist);
    await user.save();
    await user.remove();

    return user._id.toString();
}

const allTourists = async () => {
    const tourists = await Note.find({});
    return tourists;
}

module.exports = {addToursit , getExistingId , getNonExistingId , allTourists}