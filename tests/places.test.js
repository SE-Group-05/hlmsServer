const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Places = require("../models/visitingPlaces");
const { getAdminToken, getAssistantToken } = require('./helpers/user_helper');
const { addPlacesToDb } = require('./helpers/place_helper');

const api = "/places";

var adminToken;
var assistantToken;

beforeAll(async () => {
  await Places.deleteMany({});
  await addPlacesToDb();
  adminToken = await getAdminToken();
  assistantToken = await getAssistantToken();
});



describe('Place Model', () => {
  it('Place model exists', () => {
    assert.notEqual(Places, undefined, 'Place should not be undefined')
  })
})

describe("GET /places", () => {
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
    expect(receivedData.visitingPlaces.length).to.eql(3);
    done();
  });
});

describe("POST /places", () => {
  beforeAll(async () => {
    await Places.deleteMany({});
  });

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
      .post(api)
      .send({});
    expect(response.status).to.eql(401);
    done();
  });

  it("with invalid Authorization - 403", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${assistantToken}`)
      .send(newPlace)
      .expect(403);
    done();
  });

  it("with Authorization - 200", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newPlace)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(200);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(true);
    expect(receivedData.visitingPlace.name).to.eql("Galle Dutch Fort");
    const getResponse = await server
      .get(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getResponse.status).to.eql(200);
    expect(getResponse.body.success).to.eql(true);
    expect(getResponse.body.visitingPlaces.length).to.eql(1);
    done();
  });

  it("with invalid Authorization - 403", async (done) => {
    await server
      .post(api)
      .set("Authorization", `Bearer ${assistantToken}`)
      .expect(403);
    done();
  });

  it("already existing - 403", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newPlace)
      .expect(403)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(403);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(false);
    expect(receivedData.message).to.eql("Duplicate Key");
    done();
  });

  it("validation failed - 403", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(nonValidPlace)
      .expect(403)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(403);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(false);
    expect(receivedData.message).to.eql("Place validation failed");
    done();
  });
});

describe("PUT /places", () => {
  it("does not support - 403", async (done) => {
    const response = await server
      .put(api);
    expect(response.status).to.eql(403);
    done();
  });
});


describe("POST /places/search", () => {
  it("requires Authorization - 401", async (done) => {
    const response = await server
      .post("/places/search");
    expect(response.status).to.eql(401);
    done();
  });
  it("with Authorization - 200", async (done) => {
    await server
      .post("/places/search")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const response = await server
      .post("/places/search")
      .send({ similarTo: "Galle Dutch Fort" })
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(200);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(true);
    expect(receivedData.visitingPlaces.length).to.eql(1);
    expect(receivedData.visitingPlaces[0].name).to.eql("Galle Dutch Fort");
    done();
  });
  it("with Authorization - another one - 200", async (done) => {
    const response = await server
      .post("/places/search")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(200);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(true);
    expect(receivedData.visitingPlaces.length).to.eql(1);
    done();
  });
});


describe("DELETE /places", () => {
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