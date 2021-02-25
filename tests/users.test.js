const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Users = require('../models/users');
const { decodeToken } = require('./helpers/user_helper');

var adminToken;

beforeAll(async () => {
    await Users.deleteMany({});
});

describe('User Model', () => {
    it('User model exists', () => {
        assert.notEqual(Users, undefined, 'User should not be undefined')
    })
});

describe("Admin SignUp & Login", () => {
    var admin = {
        "firstname": "Admin",
        "lastname": "Admin",
        "email": "admin@gmail.com",
        "password": "admin-password"
    };
    it("Admin SignUp - 200", async (done) => {
        const response = await server
            .post("/users/signup/admin")
            .send(admin)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.status).to.eql('Registration Successful!');
        done();
    });
    it("Admin SignUp - Already Existing - 403", async (done) => {
        const response = await server
            .post("/users/signup/admin")
            .send(admin)
            .expect(403)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(403);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Registration Unsuccessful!');
        done();
    });
    it("Admin Login with correct credentials - 200", async (done) => {
        var creds = {
            username: admin.email,
            password: admin.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.status).to.eql('Login Successful!');
        adminToken = receivedData.token;
        done();
    });
});

describe("User Login", () => {
    var user = {
        "email": "admin@gmail.com",
        "password": "admin-password"
    };
    it("User Login with correct credentials - 200", async (done) => {
        var creds = {
            username: user.email,
            password: user.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.status).to.eql('Login Successful!');
        adminToken = receivedData.token;
        done();
    });
    it("User Login with wrong credentials - wrong password - 401", async (done) => {
        var creds = {
            username: user.email,
            password: "wrong-password",
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Login Unsuccessful!');
        expect(receivedData.err.name).to.eql('IncorrectPasswordError');
        done();
    });
    it("User Login with wrong credentials - wrong username - 401", async (done) => {
        var creds = {
            username: "adminwrong@gmail.com",
            password: user.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Login Unsuccessful!');
        expect(receivedData.err.name).to.eql('IncorrectUsernameError');
        done();
    });
});

describe('Change Password', () => {
    it("requires Authorization - 401", async (done) => {
        var id = decodeToken(adminToken)._id;
        const route = `/users/changepassoword/${id}`;
        const response = await server
            .post(route);
        expect(response.status).to.eql(401);
        done();
    });
    it("with Authorization - 200", async (done) => {
        var id = decodeToken(adminToken)._id;
        const route = `/users/changepassoword/${id}`;
        const response = await server
            .post(route)
            .send({newPassword:"newPassword"})
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).to.eql(200);
        done();
    });
})
