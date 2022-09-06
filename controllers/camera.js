import pkg from "gphoto2";
const { gphoto2 } = pkg;

export const capture = (req, res) => {
    try {
        var GPhoto = new gphoto2.GPhoto2();
        GPhoto.list(function (list) {
            if (list.length === 0) return;
            var camera = list[0];
            console.log('Found', camera.model);

            // get configuration tree
            camera.getConfig(function (er, settings) {
                console.log(settings);
            });

            // Get preview picture (from AF Sensor, fails silently if unsupported)
            camera.takePicture({
                preview: true,
                targetPath: '/tmp/foo.XXXXXX'
            }, function (er, tmpname) {
                fs.renameSync(tmpname, __dirname + '/picture.jpg');
            });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}