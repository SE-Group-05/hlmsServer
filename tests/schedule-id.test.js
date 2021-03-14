const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Schedule = require("../models/schedules");
const { getAdminToken } = require('./helpers/user_helper');
const { addSchedulesToDb, getExistingId, getNonExistingId } = require('./helpers/schedule_helper');

var adminToken;
var existingId;
var nonExistingId;
var api;
var wrongapi;

beforeAll(async () => {
    await Schedule.deleteMany({});
    await addSchedulesToDb();
    adminToken = await getAdminToken();
    nonExistingId = await getNonExistingId();
    existingId = await getExistingId();
    wrongapi = `/schedules/${nonExistingId}`;
    api = `/schedules/${existingId}`;
});

describe("GET /schedule/:scheduleId", () => {
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
        expect(receivedData.schedule.travellingMethod).to.eql("Car");
        done();
    });
    it("invalid schedule id - 404", async (done) => {
        const invalidId = '5a3d5da59070081a82a3445';
        const response = await server
            .get(`/schedules/${invalidId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(404);
        expect(response.status).to.eql(404);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        done();
    });
});

describe("POST /schedules/:scheduleId", () => {
    it("does not support - 403", async (done) => {
        const response = await server
            .post(api)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(response.status).to.eql(403);
        done();
    });
});

describe("PUT /schedules/:scheduleId", () => {
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
                "state": "canceled"
            })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.schedule.travellingMethod).to.eql("Car");
        expect(receivedData.schedule.state).to.eql("canceled");
        done();
    });
});

describe("DELETE /schedule/:scheduleId", () => {
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