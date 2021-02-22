const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Users = require('../models/users');

describe("Admin SignUp & Login", () => {
    beforeAll(async () => {
        await Users.deleteMany({});
    });
    var admin = {
        "firstname": "Admin",
        "lastname": "Admin",
        "email": "admin@gmail.com",
        "password": "admin-password"
    };
    it("Admin SignUp", async (done) => {
        const response = await server
            .post("/users/signup/admin")
            .send(admin).expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const recivedData = response.body;
        expect(recivedData.success).to.eql(true);
        expect(recivedData.status).to.eql('Registration Successful!');
        done();
    });
    it("Admin Login with correct credentials - 200", async (done) => {
        var creds = {
            username: admin.email,
            password: admin.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds).expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const recivedData = response.body;
        expect(recivedData.success).to.eql(true);
        expect(recivedData.status).to.eql('Login Successful!');
        const token = recivedData.token;

        done();
    });
    it("Admin Login with wrong credentials - wrong password - 401", async (done) => {
        var creds = {
            username: admin.email,
            password: "wrong-password",
        };
        const response = await server
            .post("/users/login")
            .send(creds).expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const recivedData = response.body;
        expect(recivedData.success).to.eql(false);
        expect(recivedData.status).to.eql('Login Unsuccessful!');
        expect(recivedData.err.name).to.eql('IncorrectPasswordError');
        done();
    });
    it("Admin Login with wrong credentials - wrong username - 401", async (done) => {
        var creds = {
            username: "adminwrong@gmail.com",
            password: admin.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds).expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const recivedData = response.body;
        expect(recivedData.success).to.eql(false);
        expect(recivedData.status).to.eql('Login Unsuccessful!');
        expect(recivedData.err.name).to.eql('IncorrectUsernameError');
        done();
    });
});