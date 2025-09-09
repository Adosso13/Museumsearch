import GenreRepository from "../repository/genre_repository.js";
class GenreController {
    index = async (req, res) => {
        const results = await new GenreRepository().selectAll();
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        /*

        */
        res.status(200).json({
            status: 200,
            message: "Welcome tgggggo my API",
            data: results,
        });
    };
    one = async (req, res) => {
        const results = await new GenreRepository().selectOne(req.params);
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
        const results = await new GenreRepository().insert(req.body);
        console.log(req.body);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                // afficher un simple message pour la production, sinon afficher l'erreur
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(201).json({
            status: 201,
            message: "Genre cree",
            data: results,
        });
    };
    update = async (req, res) => {
        const results = await new GenreRepository().update(req.body);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                // afficher un simple message pour la production, sinon afficher l'erreur
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Genre updated",
            data: results,
        });
    };
    delete = async (req, res) => {
        const results = await new GenreRepository().delete(req.body);
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                // afficher un simple message pour la production, sinon afficher l'erreur
                message: process.env.NODE_ENV === "prod" ? "Error" : results,
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Genre deleted",
            data: results,
        });
    };
}
export default GenreController;
