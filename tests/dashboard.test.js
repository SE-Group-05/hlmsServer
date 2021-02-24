const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Places = require("../models/visitingPlaces");
const { getAdminToken, getAssistantToken } = require('./helpers/user_helper');
const { addPlacesToDb } = require('./helpers/place_helper');

const api = "/dashboard/admin";

var adminToken;
var assistantToken;

beforeAll(async () => {
  await Places.deleteMany({});
  await addPlacesToDb();
  adminToken = await getAdminToken();
  assistantToken = await getAssistantToken();
});

describe("GET /dashboard", () => {
  it("requires Authorization - 403", async (done) => {
    const response = await server
      .get(api)
      .set("Authorization", `Bearer ${assistantToken}`);
    expect(response.status).to.eql(403);
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
    done();
  });
});