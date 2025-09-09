import express from "express";
import ArtistController from "../controller/artist_controller.js";
class ArtistRouter {
    // définir un routeur
    router = express.Router();
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new ArtistController().index);
        this.router.get("/:id", new ArtistController().one);
        this.router.post("/", new ArtistController().insert);
        this.router.put("/", new ArtistController().update);
        this.router.delete("/", new ArtistController().delete);
        return this.router;
    };
}
export default ArtistRouter;
