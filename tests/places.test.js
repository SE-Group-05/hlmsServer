const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const mockPlaces = require('./mockData/places.data');

describe("POST /places", () => {
  it("requires authentication", async (done) => {
    const response = await server.post("/places").send({});

    expect(response.status).to.eql(401);
    done();
  });
});
