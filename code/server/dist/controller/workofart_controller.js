import WorkOfArtRepository from "../repository/workofart_repository.js";
class WorkOfArtController {
    index = async (req, res) => {
        const results = await new WorkOfArtRepository().selectAll();
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Welcome to my API",
            data: results,
        });
    };
    one = async (req, res) => {
        const results = await new WorkOfArtRepository().selectOne(req.params);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "ok",
            data: results,
        });
    };
    insert = async (req, res) => {
        const results = await new WorkOfArtRepository().insert(req.body);
        //console.log(req.body);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(201).json({
            status: 201,
            message: "jeu cree",
            data: results,
        });
    };
    update = async (req, res) => {
        const results = await new WorkOfArtRepository().update(req.body);
        console.log(req.body);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "WorkOfArt updated",
            data: results,
        });
    };
    delete = async (req, res) => {
        const results = await new WorkOfArtRepository().delete(req.body);
        console.log(results);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "WorkOfArt deleted",
            data: results,
        });
    };
}
export default WorkOfArtController;
