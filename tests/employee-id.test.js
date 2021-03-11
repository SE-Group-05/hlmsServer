const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Employee = require("../models/users");
const { getAdminToken, addAssistant, getExistingIdAssistanct, getNonExistingIdAssistant } = require('./helpers/user_helper');

var adminToken;
var existingId;
var nonExistingId;
var api;
var wrongapi;

beforeAll(async () => {
    await Employee.deleteMany({});
    await addAssistant();
    adminToken = await getAdminToken();
    nonExistingId = await getNonExistingIdAssistant();
    existingId = await getExistingIdAssistanct();
    wrongapi = `/employees/${nonExistingId}`;
    api = `/employees/${existingId}`;
});

describe("GET /employees/:employeeId", () => {
    it("requires Authorization - 401", async (done) => {
        const response = await server
            .get(api);
        expect(response.status).to.eql(401);
        done();
    });
    it("with Authorization - 200", async (done) => {
        const response = await server
            .get(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.employee.firstname).to.eql("Kasun");
        done();
    });
    it("invalid employees id - 404", async (done) => {
        const invalidId = '5a3d5da59070081a82a3445';
        const response = await server
            .get(`/employees/${invalidId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(404);
        expect(response.status).to.eql(404);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        done();
    });
});

describe("POST /employees/:touristsId", () => {
    it("does not support - 403", async (done) => {
        const response = await server
            .post(api);
        expect(response.status).to.eql(403);
        done();
    });
});

describe("PUT /employees/:employeeId", () => {
    it("requires Authorization - 401", async (done) => {
        const response = await server
            .put(api);
        expect(response.status).to.eql(401);
        done();
    });

    it("with Authorization - 200", async (done) => {
        const response = await server
            .put(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                "firstname": "Nuwan",
                "lastname" : "silva"
            })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.employee.firstname).to.eql("Nuwan");
        expect(receivedData.employee.lastname).to.eql("silva");
        done();
    });
});

describe("DELETE /employees/:employeesId", () => {
    it("requires Authorization - 401", async (done) => {
        const response = await server
            .delete(api);
        expect(response.status).to.eql(401);
        done();
    });
    it("with Authorization - 200", async (done) => {
        const response = await server
            .delete(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        done();
    });
});