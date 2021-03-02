const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
//const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser')

// dotenv configuration
require('dotenv').config()

// Parse Dashboard and Server configs
const parseDashboard = require('./config/parse-dashboard');
const parseServer = require('./config/parse-server');

// Landmark api route
const landmarkRoute = require('./routes/landmarks');

const app = express();

// Use cors
app.use(cors());

// Use body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Serve the Parse API on the /parse URL prefix
app.use('/parse', new ParseServer(parseServer));

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', new ParseDashboard(parseDashboard));

/* // Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));
 */
// Landmarks API
app.use('/api/landmarks', landmarkRoute);

// Parse Server plays nicely with the rest of your web routes
/* app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
}); */

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
/* app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
}); */

const port = process.env.SERVER_PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
