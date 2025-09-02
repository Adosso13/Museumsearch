class HomepageController {
    index = (req, res) => {
        /*

        */
        res.status(200).json({
            status: 200,
            message: "Welcome to my API",
        });
    };
}
export default HomepageController;
