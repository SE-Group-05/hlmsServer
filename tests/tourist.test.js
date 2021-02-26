const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Tourist = require("../models/users");
const { getAdminToken, getAssistantToken ,addTourist, getTouristToken} = require('./helpers/user_helper');

const api = "/tourists";

var adminToken;
var assistantToken;

beforeAll(async () => {
  await Tourist.deleteMany({});
  await addTourist();
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
    expect(receivedData.tourists.length).to.eql(1);
    done();
  });
});

describe("POST /tourists", () => {
  const nonValidTourist = {
    "firstname": "test user",
    "lastname": "usersurname",
    
};
  const newTourist = {
    ...nonValidTourist, ...{ "email": "user111@gmail.com" }
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
    console.log(receivedData);
    expect(receivedData.email).to.eql("user111@gmail.com");
    const getResponse = await server
      .get(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getResponse.status).to.eql(200);
    expect(getResponse.body.success).to.eql(true);
    expect(getResponse.body.tourists.length).to.eql(2);
    done();
  });

  it("with invalid Authorization - 403", async (done) => {
    await server
      .post(api)
      .set("Authorization", `Bearer ${assistantToken}`)
      .send(newTourist)
      .expect(403);
    done();
  });

  it("already existing - 403", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newTourist)
      .expect(403)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(403);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(false);
    expect(receivedData.message).to.eql("A user with the given username is already registered");
    done();
  });

  it("validation failed - 403", async (done) => {
    const response = await server
      .post(api)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(nonValidTourist)
      .expect(403)
      .expect('Content-Type', /application\/json/);
    expect(response.status).to.eql(403);
    const receivedData = response.body;
    expect(receivedData.success).to.eql(false);
    expect(receivedData.message).to.eql("No username was given");
    done();
  });

  describe("POST /tourists/search", () => {
    it("requires Authorization - 401", async (done) => {
      const response = await server
        .post("/tourists/search");
      expect(response.status).to.eql(401);
      done();
    });
    it("with Authorization - 200", async (done) => {
      await server
        .post("/tourists/search")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const response = await server
        .post("/tourists/search")
        .send({ similarTo: "Sunil" })
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(response.status).to.eql(200);
      const receivedData = response.body;
      expect(receivedData.success).to.eql(true);
      expect(receivedData.tourists.length).to.eql(1);
      expect(receivedData.tourists[0].firstname).to.eql("Sunil");
      done();
    });
    it("with Authorization - another one - 200", async (done) => {
      const response = await server
        .post("/tourists/search")
        .set("Authorization", `Bearer ${adminToken}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(response.status).to.eql(200);
      const receivedData = response.body;
      expect(receivedData.success).to.eql(true);
      expect(receivedData.tourists.length).to.eql(2);
      done();
    });
  });



});

describe("PUT /tourists", () => {
  it("does not support - 403", async (done) => {
    const response = await server
      .put(api);
    expect(response.status).to.eql(403);
    done();
  });
});




describe("DELETE /tourists", () => {
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
