export const home = (req, res) => {
    try {
        console.log("home");
        res.send("../src/index.html")
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}