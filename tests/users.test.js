const app = require('../app');
const server = require("supertest")(app);
const expect = require("chai").expect;
const Users = require('../models/users');
const {getAssistantToken,getExistingIdAssistanct,getNonExistingId} = require('../tests/helpers/user_helper');

var adminToken;
var adminToken1;
var api;
var id;
var invalidId 

beforeAll(async () => {
    await Users.deleteMany({});
    id = await getExistingIdAssistanct();
});

describe("Admin SignUp & Login", () => {
    var nonValidadmin = {
        "firstname": "Admin",
        "lastname": "Admin",
        
    };

    var admin = {
        ...nonValidadmin, ...{  "password": "admin-password","email": "admin@gmail.com" }
      };

    

    it("Admin SignUp - Validation error - 403", async (done) => {
        const response = await server
            .post("/users/signup/admin")
            .send(nonValidadmin)
            .expect(403)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(403);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Registration Unsuccessful!');
        done();
    });


    it("Admin SignUp - 200", async (done) => {
        const response = await server
            .post("/users/signup/admin")
            .send(admin)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.status).to.eql('Registration Successful!');
        done();
    });

    it("Admin SignUp - Already Existing - 403", async (done) => {
        const response = await server
            .post("/users/signup/admin")
            .send(admin)
            .expect(403)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(403);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Registration Unsuccessful!');
        done();
    });

    it("Admin Login with wrong credentials - wrong username - 401", async (done) => {
        var creds = {
            username: "123@gmail.com",
            password: admin.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Login Unsuccessful!');
        done();
    });


    it("Admin Login with wrong credentials - wrong password - 401", async (done) => {
        var creds = {
            username: admin.email,
            password: "password",
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Login Unsuccessful!');
        done();
    });

    it("Admin Login with correct credentials - 200", async (done) => {
        var creds = {
            username: admin.email,
            password: admin.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.status).to.eql('Login Successful!');
        adminToken1 = receivedData.token;
        done();
    });
});

describe("User Login", () => {
    var user = {
        "email": "admin@gmail.com",
        "password": "admin-password"
    };
    it("User Login with correct credentials - 200", async (done) => {
        var creds = {
            username: user.email,
            password: user.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(200);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(true);
        expect(receivedData.status).to.eql('Login Successful!');
        adminToken = receivedData.token;
        done();
    });
    it("User Login with wrong credentials - wrong password - 401", async (done) => {
        var creds = {
            username: user.email,
            password: "wrong-password",
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Login Unsuccessful!');
        expect(receivedData.err.name).to.eql('IncorrectPasswordError');
        done();
    });
    it("User Login with wrong credentials - wrong username - 401", async (done) => {
        var creds = {
            username: "adminwrong@gmail.com",
            password: user.password,
        };
        const response = await server
            .post("/users/login")
            .send(creds)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(response.status).to.eql(401);
        const receivedData = response.body;
        expect(receivedData.success).to.eql(false);
        expect(receivedData.status).to.eql('Login Unsuccessful!');
        expect(receivedData.err.name).to.eql('IncorrectUsernameError');
        done();
    });
});

describe("change password" , () => {
    var password = {password : "newPassword"};
    

    it("requires Authorization - 401", async (done) => {
        
        const response = await server
          .post(`/users/changepassoword/${id}`);
        expect(response.status).to.eql(401);
        done();
      });

   
      it("user Not found - 404", async (done) => {
        invalidId = await getNonExistingId();
        const response = await server
          .post(`/users/changepassoword/${invalidId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send(password)
          .expect(404);
        expect(response.status).to.eql(404);
        expect(response.body.message).to.eql('This user does not exist');
        done();
      });

      it("with Authorization - 200", async (done) => {
        const response = await server
          .post(`/users/changepassoword/${id}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .send(password)
          .expect(200);
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql('password reset successful');
        done();
      });      
});





    
                