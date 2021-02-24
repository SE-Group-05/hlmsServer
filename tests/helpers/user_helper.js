const app = require('../../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
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
    if (!adminToken){
        await getAdminToken();
    }
    const password = await addAssistant()
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


module.exports = {
    getAdminToken, getAssistantToken
}