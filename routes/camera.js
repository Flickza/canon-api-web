import express from 'express';
import gphoto2 from 'gphoto2';
import temp from 'temp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __root = "/home/pi/node/canon-api-web";

var gphoto = new gphoto2.GPhoto2();
var camera = undefined;

temp.track();

const writeTempImage = (binary) => {
    const path = temp.path({ prefix: 'temp-image', suffix: '.jpg' });
    fs.writeFileSync(path, binary, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("[SUCCESS]")
        }
    })
    return path;
}

gphoto.list(function (cameras) {
    console.log("found " + cameras.length + " cameras");
    camera = cameras[0];
    console.log("loading " + camera.model + " settings");
    return camera.getConfig(function (er, settings) {
        if (er) {
            console.error({ camera_error: er });
        }
        return console.log(settings);
    });
});

//capture image
router.get('/capture', (req, res) => {
    // Take picture with camera object obtained from list()
    camera.takePicture({ download: true }, function (er, data) {
        if (data) {
            const tempPath = writeTempImage(data);
            const b64 = Buffer.from(data).toString('base64');
            const mimeType = 'image/jpg';
            res.send({ img: `<img id="image" src="data:${mimeType};base64, ${b64}" hidden/>`, path: tempPath });
        } else {
            res.sendStatus(500);
        }
    });
});
//download last taken picture
router.get('/download', (req, res) => {
    if (req.query.path != null) {
        res.download(req.query.path);
        temp.cleanup((err, stats) => {
            console.log(stats);
        })
    } else {
        res.sendStatus(404);
    }
});
//delete a file
// router.delete('/delete/:filename', (req, res) => {
//     var filename = req.query.filename;
//     fs.unlink(path, (err) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//     });
// })

export default router;