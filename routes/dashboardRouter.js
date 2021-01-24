const express = require('express');
const bodyParser = require('body-parser');

const cors = require('./cors');
var authenticate = require('../middleware/authenticate');
const dashboardController = require('../controllers/dashboardController');

const dashboardRouter = express.Router();

dashboardRouter.use(bodyParser.json());

dashboardRouter.route('/admin')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, dashboardController.getDashboard);

module.exports = dashboardRouter;