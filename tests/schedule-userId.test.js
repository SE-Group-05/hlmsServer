const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Schedule = require("../models/schedules");
const { getAdminToken,getExistingId,getNonExistingId } = require('./helpers/user_helper');
const { addSchedulesToDb} = require('./helpers/schedule_helper');

var adminToken;
var existingId;
var nonExistingId;
var api;
var wrongapi;

beforeAll(async () => {
    await Schedule.deleteMany({});
    adminToken = await getAdminToken();
    nonExistingId = await getNonExistingId();
    existingId = await getExistingId();
    await addSchedulesToDb(existingId);
    wrongapi = `/schedules/user/${nonExistingId}`;
    api = `/schedules/user/${existingId}`;
});


describe("GET /schedule/:visitingPlaceId", () => {
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
        expect(receivedData.schedules[0].travellingMethod).to.eql("Bus");
        done();
    });
    it("invalid user id - 404", async (done) => {
        const invalidId = '5a3d5da59070081a82a3445';
        const response = await server
            .get(`/schedules/user/${invalidId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(404);
        expect(response.status).to.eql(404);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        done();
    });
});
