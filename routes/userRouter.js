var express = require('express');
var userRouter = express.Router();

const bodyParser = require('body-parser');
var upload = require('../controllers/upload');
const { checkSchema } = require('express-validator');
var authenticate = require('../middleware/authenticate');
var validationRules = require('../middleware/validation');
var userController = require('../controllers/userController');
const cors = require('./cors');

userRouter.use(bodyParser.json());

userRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

userRouter.post('/signup/admin', cors.corsWithOptions, userController.signupAdmin);

userRouter.post('/login', cors.corsWithOptions, userController.login);

userRouter.post('/changepassoword/:id', userController.changePassoword);

userRouter.post("/updateprofilepicture/:id", upload.UploadUserImage);

userRouter.get('/logout', userController.logout);

userRouter.get('/checkJWTtoken', cors.corsWithOptions, userController.checkJWTtoken);

module.exports = userRouter;
