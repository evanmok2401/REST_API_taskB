// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import Config
let config = require('config');
// Initialise the app
let app = express();
// Import Serverless
let sls = require('serverless-http')

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
var connectionString = config.DBHost || "mongodb+srv://evanmok2401:GCBQ7e3FGrU5VDr@bookhub.softc.mongodb.net/bookhub?retryWrites=true&w=majority"
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Bookhub on port " + port);
});

module.exports = app; // for testing
module.exports.run = sls(app)