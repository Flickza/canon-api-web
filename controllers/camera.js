export const capture = (req, res) => {
    try {

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
