const Places = require('../../models/visitingPlaces');
const mockPlaces = require('../mockData/places.data');

const initialPlaces = mockPlaces;

const addPlacesToDb = async () => {
    const placeObjects = initialPlaces
        .map(place => new Places(place));
    const promiseArray = placeObjects.map(place => place.save());
    await Promise.all(promiseArray);
}

const getExistingId = async () => {
    const newPlace = {
        "name": "Galle Dutch Fort",
        "description": "Duis amet in ipsum ut consequat. Aliquip quis quis et laboris non mollit nisi ut mollit fugiat occaecat id nostrud. Mollit mollit aliquip reprehenderit voluptate commodo id nostrud non.",
        "location": {
            coordinates: [6.02453869574481, 80.21798550785017]
        },
        "distance": "20km",
        "timeToReach": "30min",
        "images": [],
        "methods": ['Car']
    };
    const place = new Places(newPlace);
    await place.save();

    return place._id.toString();
}

const getNonExistingId = async () => {
    const newPlace = {
        "name": "To be deleted",
        "description": "Duis amet in ipsum ut.",
        "location": {
            coordinates: [6.02453869574481, 80.21798550785017]
        },
        "distance": "10km",
        "timeToReach": "20min",
        "images": [],
        "methods": ['Foot']
    };
    const place = new Places(newPlace);
    await place.save();
    await place.remove();

    return place._id.toString();
}

const placesInDb = async () => {
    const places = await Note.find({});
    return places;
}

module.exports = {
    initialPlaces, addPlacesToDb, getExistingId, getNonExistingId, placesInDb
}