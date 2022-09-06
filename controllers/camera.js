import gphoto2 from 'gphoto2';

export const capture = (req, res) => {
    try {
        var camera = req.app.get(camera);
        console.log(camera);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
