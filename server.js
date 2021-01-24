// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, ()=> {
    console.log(`server is lestening to port ${port}`);
});



/**
 * Routes
 */

// GET Route
app.get('/all', returnData);

// Callback function to complete GET '/all'
function returnData(req, res) {
    res.send(projectData);
}


// POST Route
app.post('/data', saveData);

// Callback function to complete POST '/data'
function saveData(req, res) {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
}
