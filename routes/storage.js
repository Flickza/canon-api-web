import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', function (req, res) {
    try {
        var files = fs.readdirSync('/home/pi/node/canon-api-web/src/prosjekt');
        res.send(files);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:prosjekt', function (req, res) {
    try {
        var files = fs.readdirSync(`/home/pi/node/canon-api-web/src/prosjekt/${req.params.prosjekt}`);
        res.send(files);
    } catch (err) {
        res.send(err);
    }
});

export default router;