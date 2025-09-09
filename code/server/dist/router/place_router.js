import express from "express";
import PlaceController from "../controller/place_controller.js";
class PlaceRouter {
    // définir un routeur
    router = express.Router();
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new PlaceController().index);
        this.router.get("/:id", new PlaceController().one);
        this.router.post("/", new PlaceController().insert);
        this.router.put("/", new PlaceController().update);
        this.router.delete("/", new PlaceController().delete);
        return this.router;
    };
}
export default PlaceRouter;
