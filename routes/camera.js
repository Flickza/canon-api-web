import express from 'express';
import gphoto2 from 'gphoto2';
import fs from 'fs';

const router = express.Router();

var gphoto = new gphoto2.GPhoto2();
var requests = {};
var preview_listeners = [];
var camera = undefined;

gphoto.list(function (cameras) {
    console.log("found " + cameras.length + " cameras");
    camera = cameras[0];
    console.log("loading " + camera.model + " settings");
    return camera.getConfig(function (er, settings) {
        if (er) {
            console.error({
                camera_error: er
            });
        }
        return console.log(settings);
    });
});

//homepage
router.get('/capture', (req, res) => {
    // Take picture with camera object obtained from list()
    camera.takePicture({ download: true }, function (er, data) {
        // fs.writeFileSync(__dirname + '/picture.jpg', data);
        console.log(data);
    });

});

export default router;