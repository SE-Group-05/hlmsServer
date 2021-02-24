const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Places = require("../models/visitingPlaces");
const { getAdminToken } = require('./helpers/user_helper');
const { addPlacesToDb, getExistingId, getNonExistingId } = require('./helpers/place_helper');

var adminToken;
var existingId;
var nonExistingId;
var api;
var wrongapi;

beforeAll(async () => {
    await Places.deleteMany({});
    await addPlacesToDb();
    adminToken = await getAdminToken();
    nonExistingId = await getNonExistingId();
    existingId = await getExistingId();
    wrongapi = `/places/${nonExistingId}`;
    api = `/places/${existingId}`;
});

describe("GET /places/:visitingPlaceId", () => {
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
        expect(receivedData.visitingPlace.name).to.eql("Galle Dutch Fort");
        done();
    });
    it("invalid place id - 404", async (done) => {
        const invalidId = '5a3d5da59070081a82a3445';
        const response = await server
            .get(`/places/${invalidId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(404);
        expect(response.status).to.eql(404);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        done();
    });
});

describe("POST /places/:visitingPlaceId", () => {
    it("does not support - 403", async (done) => {
        const response = await server
            .post(api);
        expect(response.status).to.eql(403);
        done();
    });
});

describe("PUT /places/:visitingPlaceId", () => {
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
                "distance": "10km",
                "timeToReach": "50min",
            })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.visitingPlace.name).to.eql("Galle Dutch Fort");
        expect(receivedData.visitingPlace.distance).to.eql("10km");
        expect(receivedData.visitingPlace.timeToReach).to.eql("50min");
        done();
    });
});

describe("DELETE /places/:visitingPlaceId", () => {
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