const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const assert = require('chai').assert;
const Employee = require("../models/users");
const { getAdminToken,addAssistant, getAssistantToken} = require('./helpers/user_helper');

const api = "/employees";

var adminToken;
var assistantToken;


beforeAll(async () => {
    await Employee.deleteMany({});
    await addAssistant();
    adminToken = await getAdminToken();
    assistantToken = await getAssistantToken();
  });
  
  describe('Employee Model', () => {
      it('Employee model exists', () => {
        assert.notEqual(Employee, undefined, 'Employee should not be undefined')
      })
    });

    describe("GET /employees", () => {
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
          expect(receivedData.employees.length).to.eql(1);
          done();
        });
      });
      
      describe("POST /employees", () => {
        const nonValidAssistant = {
          "firstname": "testAssistant",
          "lastname": "assistantName",
          
      };
        const newAssistant = {
          ...nonValidAssistant, ...{ "email": "assistant@gmail.com" }
        };
      
        it("requires Authorization - 401", async (done) => {
          const response = await server
            .post(api)
            .send({});
          expect(response.status).to.eql(401);
          done();
        });

        it("validation failed - 403", async (done) => {
          const response = await server
            .post(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .send(nonValidAssistant)
            .expect(403)
            .expect('Content-Type', /application\/json/);
          expect(response.status).to.eql(403);
          const receivedData = response.body;
          expect(receivedData.success).to.eql(false);
          expect(receivedData.message).to.eql("No username was given");
          done();
        });
    
      
        it("with invalid Authorization - 403", async (done) => {
            await server
            .post(api)
            .set("Authorization", `Bearer ${assistantToken}`)
            .send(newAssistant)
            .expect(403);
          done();
        });

      
        it("with Authorization - 200", async (done) => {
          const response = await server
            .post(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .send(newAssistant)
            .expect(200)
            .expect('Content-Type', /application\/json/);
          expect(response.status).to.eql(200);
          const receivedData = response.body;
          expect(receivedData.success).to.eql(true);
          expect(receivedData.email).to.eql("assistant@gmail.com");
          const getResponse = await server
            .get(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
          expect(getResponse.status).to.eql(200);
          expect(getResponse.body.success).to.eql(true);
          expect(getResponse.body.employees.length).to.eql(2);
          done();
        });

        it("already existing - 403", async (done) => {
          const response = await server
            .post(api)
            .set("Authorization", `Bearer ${adminToken}`)
            .send(newAssistant)
            .expect(403)
            .expect('Content-Type', /application\/json/);
          expect(response.status).to.eql(403);
          const receivedData = response.body;
          expect(receivedData.success).to.eql(false);
          expect(receivedData.message).to.eql("A user with the given username is already registered");
          done();
        });
      
        
      
        describe("POST /employees/search", () => {
          it("requires Authorization - 401", async (done) => {
            const response = await server
              .post("/employees/search");
            expect(response.status).to.eql(401);
            done();
          });
          it("with Authorization - 200", async (done) => {
            await server
              .post("/employees/search")
              .set("Authorization", `Bearer ${adminToken}`)
              .expect(200)
              .expect('Content-Type', /application\/json/);
            const response = await server
              .post("/employees/search")
              .send({ similarTo: "testAssistant" })
              .set("Authorization", `Bearer ${adminToken}`)
              .expect(200)
              .expect('Content-Type', /application\/json/);
            expect(response.status).to.eql(200);
            const receivedData = response.body;
            expect(receivedData.success).to.eql(true);
            expect(receivedData.employees.length).to.eql(1);
            expect(receivedData.employees[0].firstname).to.eql("testAssistant");
            done();
          });
          it("with Authorization - another one - 200", async (done) => {
            const response = await server
              .post("/employees/search")
              .set("Authorization", `Bearer ${adminToken}`)
              .expect(200)
              .expect('Content-Type', /application\/json/);
            expect(response.status).to.eql(200);
            const receivedData = response.body;
            expect(receivedData.success).to.eql(true);
            expect(receivedData.employees.length).to.eql(2);
            done();
          });
        });
      
      
      
      });
      
      describe("PUT /employees", () => {
        it("does not support - 403", async (done) => {
          const response = await server
            .put(api);
          expect(response.status).to.eql(403);
          done();
        });
      });
      
      
      
      
      describe("DELETE /employees", () => {
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
