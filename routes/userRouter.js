var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var upload = require('../controllers/upload');
var userController = require('../controllers/userController');
const cors = require('./cors');

router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

router.post('/signup/admin', cors.corsWithOptions, userController.signupAdmin);

router.post('/login', cors.corsWithOptions, userController.login);

router.post('/changepassoword/:id', userController.changePassoword);

router.post("/updateprofilepicture/:id", upload.UploadUserImage);

router.get('/logout', userController.logout);

router.get('/checkJWTtoken', cors.corsWithOptions, userController.checkJWTtoken);

module.exports = router;
