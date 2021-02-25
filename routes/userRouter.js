var express = require('express');
var userRouter = express.Router();

const bodyParser = require('body-parser');
const { checkSchema } = require('express-validator');
var authenticate = require('../middleware/authenticate');
var validationRules = require('../middleware/validation');
var userController = require('../controllers/userController');
const cors = require('./cors');

userRouter.use(bodyParser.json());

userRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

userRouter.post('/signup/admin', cors.corsWithOptions, userController.signupAdmin);

userRouter.post('/login', cors.corsWithOptions, userController.login);

userRouter.post('/changepassoword/:id',authenticate.verifyUser, userController.changePassoword);

module.exports = userRouter;
