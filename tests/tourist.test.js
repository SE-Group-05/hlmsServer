const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Tourist = require("../models/users");
const { getAdminToken, getAssistantToken } = require('./helpers/user_helper');
const { addToursit} = require('./helpers/tourist_helper');

const api = "/tourists";

var adminToken;
var assistantToken;

beforeAll(async () => {
  await Tourist.deleteMany({});
  await addToursit();
  adminToken = await getAdminToken();
  assistantToken = await getAssistantToken();
});

describe('Tourist Model', () => {
    it('Tourist model exists', () => {
      assert.notEqual(Tourist, undefined, 'Tourist should not be undefined')
    })
  })

describe("GET /tourists", () => {
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
    expect(receivedData.tourists.length).to.eql(3);
    done();
  });
});

describe("POST /tourists", () => {
  const nonValidTourist = {
    "firstname": "test user",
    "lastname": "usersurname",
    "email":"user@gmail.com"
};
  const newTourist = {
    ...nonValidTourist, ...{ "username": "user@gmail.com" }
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
      .send(newTourist)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(200);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(true);
    expect(receivedData.tourists.username).to.eql("user@gmail.com");
    const getResponse = await server
      .get(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getResponse.status).to.eql(200);
    expect(getResponse.body.success).to.eql(true);
    expect(getResponse.body.tourists.length).to.eql(4);
    done();
  });

  it("with invalid Authorization - 403", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newTourist)
      .expect(403);
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