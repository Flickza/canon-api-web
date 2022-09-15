import express from 'express';
import gphoto2 from 'gphoto2';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const router = express.Router();
dotenv.config();

var gphoto = new gphoto2.GPhoto2();
var camera = undefined;

gphoto.list((cameras) => {
    console.log("found " + cameras.length + " cameras");
    camera = cameras[0];
    console.log("loading " + camera.model + " settings");
    return camera.getConfig((er, settings) => {
        if (er) {
            console.error({ camera_error: er });
        }
        return console.log(settings);
    });
});

//capture image
router.get('/capture', (req, res) => {
    var date = new Date();
    var prefix = process.env.PREFIX;
    var identifier = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "-" + new Date().getMilliseconds();
    var extension = "jpg";

    var imageName = prefix + "_" + identifier + "." + extension;
    fs.unlink(process.env.LAST_IMAGE_PATH, (err) => {
        if (err) {
            console.error(err);
        }
        console.log("File deleted at " + process.env.LAST_IMAGE_PATH);
        process.env.LAST_IMAGE_PATH = "none";
    });
    // Take picture with camera object obtained from list()
    camera.takePicture({ download: true }, (er, data) => {
        if (data) {
            const tempPath = path.join(process.cwd() + '/src/pictures/' + imageName);
            process.env.LAST_IMAGE_PATH = tempPath;
            fs.writeFileSync(tempPath, data, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("[SUCCESS]")
                }
            })
            res.send({ img: `<img id="image" src="/pictures/${imageName}" hidden/>` });
        } else {
            res.sendStatus(500);
        }
    });
});
//download last taken picture
router.get('/download', (req, res) => {
    res.download(process.env.LAST_IMAGE_PATH, (err) => {
        if (err) {
            return res.status(404).send({
                "STATUS CODE": err.statusCode,
                "ERROR CODE": err.code,
                "ERROR MESSAGE": "Image was not found, perhaps already downloaded?"
            });
        }
        console.log("File downloaded at " + process.env.LAST_IMAGE_PATH);
        fs.unlink(process.env.LAST_IMAGE_PATH, (err) => {
            if (err) {
                return res.status(404).send({
                    "STATUS CODE": err.statusCode,
                    "ERROR CODE": err.code,
                    "ERROR MESSAGE": "Image was not found, perhaps already downloaded?"
                });
            }
            console.log("File deleted at " + process.env.LAST_IMAGE_PATH);
            process.env.LAST_IMAGE_PATH = "none";
        });
    });
});

router.put('/settings/:name', function (req, res) {
    console.log(req.params.name, req.body);
    if (!camera) {
        return res.status(404).send('Camera not connected');
    } else {
        return camera.setConfigValue(req.params.name, req.body.newValue, function (er) {
            if (er) {
                return res.status(423).send(JSON.stringify(er));
            } else {
                return res.sendStatus(200);
            }
        });
    }
});

router.get('/settings', function (req, res) {
    if (!camera) {
        return res.status(404).send('Camera not connected');
    } else {
        return camera.getConfig(function (er, settings) {
            return res.send(JSON.stringify(settings));
        });
    }
});


export default router;