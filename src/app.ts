import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/router';

// Create an instance of the Express application
const app = express();

// Define the port number 
const PORT = 4000;

// Enable CORS middleware to allow cross-origin requests
app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Use the defined routes for paths starting with '/router'
app.use('/router', routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
