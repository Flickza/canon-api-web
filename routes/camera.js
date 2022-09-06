import express from 'express';
import gphoto2 from 'gphoto2';

import { capture } from '../controllers/camera.js';
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
    // Take picture without downloading immediately
    camera.takePicture({ download: false }, function (er, path) {
        console.log(path);
    });
});

export default router;