import express from "express";
import WorkOfArtController from "../controller/workofart_controller.js";
class WorkOfArtRouter {
    // définir un routeur
    router = express.Router();
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new WorkOfArtController().index);
        this.router.get("/:id", new WorkOfArtController().one);
        this.router.post("/", new WorkOfArtController().insert);
        this.router.put("/", new WorkOfArtController().update);
        this.router.delete("/", new WorkOfArtController().delete);
        return this.router;
    };
}
export default WorkOfArtRouter;
