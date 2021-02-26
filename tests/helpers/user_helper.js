const app = require('../../app');
const server = require("supertest")(app);
const jwt_decode = require('jwt-decode');
const Users = require('../../models/users');

var userToken;
var assistantToken;
var adminToken;
const admin = {
    "firstname": "Admin",
    "lastname": "Admin",
    "email": "admin@gmail.com",
    "password": "admin-password"
};
const assistant = {
    "firstname": "Dinesh",
    "lastname": "Chandimal",
    "email": "dineshchandimal@gmail.com"
};
const tourist = {
    "firstname": "Sunil",
    "lastname": "Fernamdo",
    "email": "sunilFernamdo@gmail.com"
};
const signupAdmin = async () => {
    await Users.deleteMany({});
    await server
        .post("/users/signup/admin")
        .send(admin);
};

const getAdminToken = async () => {
    if (adminToken) {
        return adminToken;
    }
    await signupAdmin();
    var creds = {
        username: admin.email,
        password: admin.password,
    };
    const response = await server
        .post("/users/login")
        .send(creds);
    adminToken = response.body.token;
    return adminToken;
}

const addAssistant = async () => {
    if (!adminToken) {
        await getAdminToken();
    }
    const response = await server
        .post("/employees")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(assistant)
        .expect(200);
    return response.body.password;
};

const getAssistantToken = async () => {
    if (assistantToken) {
        return assistantToken;
    }
    const password = await addAssistant();
    var creds = {
        username: assistant.email,
        password: password,
    };
    const response = await server
        .post("/users/login")
        .send(creds);
    assistantToken = response.body.token;
    return assistantToken;
}

const addTourist = async () => {
    if (!assistantToken) {
        await getAssistantToken();
    }
    const response = await server
        .post("/tourists")
        .set("Authorization", `Bearer ${assistantToken}`)
        .send(tourist)
        .expect(200);
    return response.body.password;
};

const getTouristToken = async () => {
    if (userToken) {
        return userToken;
    }
    const password = await addTourist();
    var creds = {
        username: tourist.email,
        password: password,
    };
    const response = await server
        .post("/users/login")
        .send(creds);
    userToken = response.body.token;
    return userToken;
}

const getExistingId = async () => {
    const newTourist = {
        "firstname": "Namal",
        "lastname": "Fernamdo",
        "email": "namalfernamdo@gmail.com",
        "mobile": "981114844",
        "rommnumber" : "41",

    }
    const tourist = new Users(newTourist);
    await tourist.save();

    return tourist._id.toString();

    
}

const getNonExistingId = async () => {
    const newTourist = {
        "firstname": "Kamal",
        "lastname": "Fernamdo",
        "email": "kamalfernamdo@gmail.com"
    }
    const tourist = new Users(newTourist);
    await tourist.save();
    await tourist.remove();

    return tourist._id.toString();
}

const decodeToken = (token) => {
    var decoded = jwt_decode(token);
    return decoded;
}

module.exports = {
    getAdminToken, getAssistantToken, getTouristToken, decodeToken, addTourist, getTouristToken ,getExistingId ,getNonExistingId
}
