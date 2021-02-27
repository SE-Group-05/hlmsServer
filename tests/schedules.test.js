const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Places = require("../models/visitingPlaces");
const Schedules = require("../models/schedules");
const { getAdminToken, getTouristToken } = require('./helpers/user_helper');
const { addPlacesToDb, getExistingId, getNonExistingId } = require('./helpers/place_helper');

const api = "/schedules";

var adminToken;
var userToken;
var placeId;
var nonExistingPlaceId;

beforeAll(async () => {
    await Places.deleteMany({});
    await Schedules.deleteMany({});
    await addPlacesToDb();
    adminToken = await getAdminToken();
    userToken = await getTouristToken();
    placeId = await getExistingId();
    nonExistingPlaceId = await getNonExistingId();
});

describe('Schedule Model', () => {
    it('Schedule model exists', () => {
        assert.notEqual(Schedules, undefined, 'Schedule should not be undefined')
    })
});

describe("GET /schedules", () => {
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
        expect(receivedData.schedules.length).to.eql(0);
        done();
    });
});

describe("POST /schedules", () => {
    const nonValidPlace = {
        "description": "Duis amet in ipsum ut consequat. Aliquip quis quis et laboris non mollit nisi ut mollit fugiat occaecat id nostrud. Mollit mollit aliquip reprehenderit voluptate commodo id nostrud non.",
        "location": {
            coordinates: [6.02453869574481, 80.21798550785017]
        },
        "distance": "20km",
        "timeToReach": "30min",
        "images": [],
        "methods": ['Car']
    };
    const newPlace = {
        ...nonValidPlace, ...{ "name": "Galle Dutch Fort" }
    };

    it("requires Authorization - 401", async (done) => {
        const response = await server
            .post(api);
        expect(response.status).to.eql(401);
        done();
    });

    // it("with Authorization - 200", async (done) => {
    //     const response = await server
    //         .post(api)
    //         .set("Authorization", `Bearer ${adminToken}`)
    //         .send(newPlace)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/);
    //     expect(response.status).to.eql(200);
    //     const receivedData = response.body;
    //     expect(receivedData.success).to.eql(true);
    //     expect(receivedData.visitingPlace.name).to.eql("Galle Dutch Fort");
    //     const getResponse = await server
    //         .get(api)
    //         .set("Authorization", `Bearer ${adminToken}`)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/);
    //     expect(getResponse.status).to.eql(200);
    //     expect(getResponse.body.success).to.eql(true);
    //     expect(getResponse.body.visitingPlaces.length).to.eql(4);
    //     done();
    // });

    // it("validation failed - 403", async (done) => {
    //     const response = await server
    //         .post(api)
    //         .set("Authorization", `Bearer ${adminToken}`)
    //         .send(nonValidPlace)
    //         .expect(403)
    //         .expect('Content-Type', /application\/json/);
    //     expect(response.status).to.eql(403);
    //     const receivedData = response.body;
    //     expect(receivedData.success).to.eql(false);
    //     expect(receivedData.message).to.eql("Place validation failed");
    //     done();
    // });
});

describe("PUT /schedules", () => {
    it("does not support - 403", async (done) => {
        const response = await server
            .put(api);
        expect(response.status).to.eql(403);
        done();
    });
});

describe("DELETE /schedules", () => {
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