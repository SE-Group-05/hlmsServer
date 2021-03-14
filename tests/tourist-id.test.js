const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Users = require("../models/users");
const { getAdminToken, addTourist, getExistingId, getNonExistingId } = require('./helpers/user_helper');

var adminToken;
var existingId;
var nonExistingId;
var api;
var wrongapi;

beforeAll(async () => {
    await Users.deleteMany({});
    await addTourist();
    adminToken = await getAdminToken();
    nonExistingId = await getNonExistingId();
    existingId = await getExistingId();
    wrongapi = `/tourists/${nonExistingId}`;
    api = `/tourists/${existingId}`;
});

describe("GET /tourists/:touristsId", () => {
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
        expect(receivedData.tourist.firstname).to.eql("Namal");
        done();
    });
    it("invalid tourists id - 404", async (done) => {
        const invalidId = '5a3d5da59070081a82a3445';
        const response = await server
            .get(`/tourists/${invalidId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(404);
        expect(response.status).to.eql(404);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        done();
    });
});

describe("POST /tourists/:touristsId", () => {
    it("does not support - 403", async (done) => {
        const response = await server
            .post(api);
        expect(response.status).to.eql(403);
        done();
    });
});

describe("PUT /tourists/:touristId", () => {
    it("requires Authorization - 401", async (done) => {
        const response = await server
            .put(api);
        expect(response.status).to.eql(401);
        done();
    });

    it("Invalid Id - 404", async (done) => {
        const invalidId = '5a3d5da59070081a82a3445';
        const response = await server
            .put(`/tourists/${invalidId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                "mobile": "988784844",
                "rommnumber" : "4",
            })
            .expect(404)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(404);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.message).to.eql('Could not find tourist with given ID');
        done();
    });

    it("with Authorization - 200", async (done) => {
        const response = await server
            .put(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                "mobile": "988784844",
                "rommnumber" : "4",
            })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.tourist.firstname).to.eql("Namal");
        expect(receivedData.tourist.mobile).to.eql("988784844");
        expect(receivedData.tourist.rommnumber).to.eql("4");
        done();
    });
});

describe("DELETE /tourists/:touristeId", () => {
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