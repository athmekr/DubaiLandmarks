const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const bodyParser = require('body-parser');
const cors = require("cors");
// Multer for formData handling
const multer = require('multer');
const forms = multer();


// dotenv configuration
require('dotenv').config()

// Parse Dashboard and Server configs
const parseServer = require('./config/parse-server');
const parseDashboard = require('./config/parse-dashboard');

// Landmark api route
const landmarkRoute = require('./routes/landmarks');

const app = express();

// Use cors
app.use(cors());
app.use(bodyParser.json()); // Enable bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
// formData handling
app.use(forms.array());


// Serve the Parse API on the /parse URL prefix
app.use('/parse', new ParseServer(parseServer));

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', new ParseDashboard(parseDashboard));

// Landmarks API
app.use('/api/landmarks', landmarkRoute);

const port = process.env.SERVER_PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
