import express from "express";
import TypeOfWorkController from "../controller/typeofwork_controller.js";
class TypeOfWorkRouter {
    // définir un routeur
    router = express.Router();
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new TypeOfWorkController().index);
        this.router.get("/:id", new TypeOfWorkController().one);
        this.router.post("/", new TypeOfWorkController().insert);
        this.router.put("/", new TypeOfWorkController().update);
        this.router.delete("/", new TypeOfWorkController().delete);
        return this.router;
    };
}
export default TypeOfWorkRouter;
