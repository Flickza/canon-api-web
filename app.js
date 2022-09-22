//Server
import express from 'express';
import dotenv from 'dotenv';

//routes
import homeRoute from './routes/index.js';
import cameraRoute from './routes/camera.js';
import storageRoute from './routes/storage.js';


//create express app
const app = express();

//import environment variables
dotenv.config();

//set json data limit to 50mb
app.use(express.json({
    limit: '50mb',
    extended: true
}));

//urlencoded data parser
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

//set static folder location route
app.use(express.static("src"));
app.use('/scripts',
    express.static('node_modules/dat.gui/build/'));


//Routes
app.use('/', homeRoute);
app.use('/camera', cameraRoute);
app.use('/storage', storageRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})