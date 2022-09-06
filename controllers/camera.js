import gphoto2 from 'gphoto2';

export const capture = (req, res) => {
    try {
        var camera = req.app.get(camera);
        // Take picture without downloading immediately
        camera.takePicture({ download: false }, function (er, path) {
            console.log(path);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
