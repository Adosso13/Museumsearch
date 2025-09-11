import PlaceRepository from "../repository/place_repository.js";
class PlaceController {
    index = async (req, res) => {
        // appel d'une méthode d'une classe de dépôt
        const results = await new PlaceRepository().selectAll();
        // si une erreur est renvoyée par la requête
        // afficher l'erreur en environnement de développement
        // afficher un simple message en environnement de production
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
        // appel d'une méthode d'une classe de dépôt
        const results = await new PlaceRepository().selectOne(req.params);
        // si une erreur est renvoyée par la requête
        // afficher l'erreur en environnement de développement
        // afficher un simple message en environnement de production
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
    insert = async (req, res) => {
        const results = await new PlaceRepository().insert(req.body);
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
        const results = await new PlaceRepository().update(req.body);
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
            message: "Artist updated",
            data: results,
        });
    };
    delete = async (req, res) => {
        const results = await new PlaceRepository().delete(req.body);
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
            message: "Artist deleted",
            data: results,
        });
    };
}
export default PlaceController;
