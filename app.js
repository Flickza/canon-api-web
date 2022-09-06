//Server
import express from 'express';
import dotenv from 'dotenv';
import gphoto2 from 'gphoto2';

//routes
import homeRoute from './routes/index.js';
import cameraRoute from './routes/camera.js';

var gphoto = new gphoto2.GPhoto2();

var requests = {};

var preview_listeners = [];

var camera = undefined;

var init_camera = () => {
    return gphoto.list(function(cameras) {
        console.log("found " + cameras.length + " cameras");
        camera = cameras[0];
        console.log("loading " + camera.model + " settings");
        return camera.getConfig(function(er, settings) {
          if (er) {
            console.error({
              camera_error: er
            });
          }
          return console.log(settings);
        });
      });
}

init_camera();

//create express app
const app = express();

//import environment variables
dotenv.config();

//set json data limit to 50mb
app.use(express.json({ limit: '50mb', extended: true }));

//urlencoded data parser
app.use(express.urlencoded({ limit: '50mb', extended: true }));


//set static folder location route
app.use(express.static("./" + 'src'));

//Routes
app.use('/', homeRoute);
app.use('/camera', cameraRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})