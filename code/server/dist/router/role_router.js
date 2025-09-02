import express from "express";
import RoleController from "../controller/role_controller.js";
class RoleRouter {
    // définir un routeur
    router = express.Router();
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new RoleController().index);
        this.router.get("/:id", new RoleController().one);
        return this.router;
    };
}
export default RoleRouter;
