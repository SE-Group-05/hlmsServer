const app = require('../app');
const mongoose = require('mongoose');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Schedules = require("../models/schedules");
const { getAdminToken, getAssistantToken ,getTouristToken} = require('./helpers/user_helper');
const { addSchedulesToDb } = require('./helpers/schedule_helper');

const api = "/schedules";

var adminToken;
var assistantToken;
var touristToken;

beforeAll(async () => {
  await Schedules.deleteMany({});
  await addSchedulesToDb();
  adminToken = await getAdminToken();
  assistantToken = await getAssistantToken();
  touristToken = await getTouristToken();
});

describe('Schedule Model', () => {
  it('Schedule model exists', () => {
    assert.notEqual(Schedules, undefined, 'Place should not be undefined')
  })
})

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
    expect(receivedData.schedules.length).to.eql(1);
    done();
  });
});

describe("POST /schedules", () => {
  const nonValidSchedule = {
    "user": mongoose.Types.ObjectId(),
    "place": mongoose.Types.ObjectId(),
    "travellingMethod": 'Train'

};
  const newSchedule = {
    ...nonValidSchedule, ...{ "date": Date(), }
  };

  it("requires Authorization - 401", async (done) => {
    const response = await server
      .post(api)
      .send({});
    expect(response.status).to.eql(401);
    done();
  });

  it("with Authorization - 200", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newSchedule)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(200);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(true);
    expect(receivedData.schedule.travellingMethod).to.eql("Train");
    const getResponse = await server
      .get(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getResponse.status).to.eql(200);
    expect(getResponse.body.success).to.eql(true);
    expect(getResponse.body.schedules.length).to.eql(2);
    done();
  });


  it("validation failed - 403", async (done) => {
    const response = await server
      .post(api)
      .send(nonValidSchedule)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(403)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(403);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(false);
    expect(receivedData.message).to.eql("Schedule validation failed");
    done();
  });
});

describe("PUT /schedule", () => {
  it("does not support - 403", async (done) => {
    const response = await server
      .put(api)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(403);
    done();
  });
});



describe("DELETE /schedule", () => {
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