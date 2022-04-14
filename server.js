// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
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
const port = 3000;
const server = app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});


app.get('/all', (req, res)=>{
    res.send(projectData); 
});


// Post Route

app.post('/add', (req, res)=>{ 
    
    projectData = req.body;
    res.send(projectData);
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'